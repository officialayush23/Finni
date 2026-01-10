# app/api/v1/endpoints/category.py
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.models.all_models import Transaction, Category
from app.schemas.schemas import CategoryCreate
router = APIRouter(prefix="/categories", tags=["Categories"])

@router.get("/analytics")
async def category_analytics(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    result = await db.execute(
        select(
            Category.id,
            Category.name,
            func.sum(Transaction.amount).label("total_spent"),
            func.count(Transaction.id).label("txn_count"),
            func.avg(Transaction.amount).label("avg_txn"),
            func.max(Transaction.amount).label("max_txn"),
        )
        .join(Transaction, Transaction.category_id == Category.id)
        .where(Transaction.user_id == auth.user_id)
        .group_by(Category.id, Category.name)
        .order_by(func.sum(Transaction.amount).desc())
    )

    return [
        {
            "category_id": row.id,
            "category_name": row.name,
            "total_spent": float(row.total_spent or 0),
            "transaction_count": row.txn_count,
            "average_transaction": float(row.avg_txn or 0),
            "largest_transaction": float(row.max_txn or 0),
        }
        for row in result
    ]


@router.get("/", response_model=list[dict])
async def list_categories(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    result = await db.execute(
        select(Category)
        .where(
            (Category.user_id == auth.user_id) |
            (Category.user_id.is_(None))
        )
        .order_by(Category.name)
    )

    return [
        {
            "id": c.id,
            "name": c.name,
            "parent_id": c.parent_id,
            "icon": c.icon,
            "color": c.color,
            "is_system": c.user_id is None,
        }
        for c in result.scalars().all()
    ]

@router.post("/", response_model=dict)
async def create_category(
    payload: CategoryCreate,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    category = Category(
        user_id=auth.user_id,
        name=payload.name.strip(),
        parent_id=payload.parent_id,
        icon=payload.icon,
        color=payload.color,
    )

    db.add(category)
    await db.commit()
    await db.refresh(category)

    return {
        "id": category.id,
        "name": category.name,
        "parent_id": category.parent_id,
    }
@router.get("/analytics/trends")
async def category_trends(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    month_expr = func.date_trunc("month", Transaction.occurred_at)

    result = await db.execute(
        select(
            Category.name,
            month_expr.label("month"),
            func.sum(Transaction.amount).label("spent"),
        )
        .join(Transaction, Transaction.category_id == Category.id)
        .where(Transaction.user_id == auth.user_id)
        .group_by(Category.name, month_expr)
        .order_by(month_expr)
    )

    data = {}
    for name, month, spent in result:
        data.setdefault(name, []).append({
            "month": month.date().isoformat(),
            "spent": float(spent or 0),
        })

    return data

@router.get("/tree")
async def category_tree(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    result = await db.execute(
        select(Category)
        .where(
            (Category.user_id == auth.user_id) |
            (Category.user_id.is_(None))
        )
        .order_by(Category.name)
    )
    categories = result.scalars().all()

    nodes = {
        str(c.id): {
            "id": str(c.id),
            "name": c.name,
            "icon": c.icon,
            "color": c.color,
            "parent_id": str(c.parent_id) if c.parent_id else None,
            "is_system": c.user_id is None,
            "children": [],
        }
        for c in categories
    }

    roots = []
    for node in nodes.values():
        if node["parent_id"] and node["parent_id"] in nodes:
            nodes[node["parent_id"]]["children"].append(node)
        else:
            roots.append(node)

    return roots