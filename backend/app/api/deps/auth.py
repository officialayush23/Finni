# app/api/deps/auth.py
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.config import settings
from app.core.database import get_db
from app.models.all_models import User
import uuid

security = HTTPBearer(auto_error=False)

class AuthUser:
    def __init__(self, user_id: uuid.UUID, email: str | None):
        self.user_id = user_id
        self.email = email


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db),
) -> AuthUser:
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Authorization header",
        )

    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            settings.SUPABASE_JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM],
            audience="authenticated",
            options={"verify_exp": True},
        )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    sub = payload.get("sub")
    email = payload.get("email")

    if not sub or not email:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    # 🔑 FIX: lookup by EMAIL, not ID
    result = await db.execute(
        select(User).where(User.email == email)
    )
    user = result.scalar_one_or_none()

    if not user:
        # Create user only if email does not exist
        user = User(
            id=uuid.UUID(sub),
            email=email,
            preferences={},
            metadata_={},
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)

    return AuthUser(
        user_id=user.id,   # <- IMPORTANT: use DB id
        email=user.email,
    )
