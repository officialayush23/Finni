# # app/api/v1/endpoints/ingest.py
# from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
# from sqlalchemy.ext.asyncio import AsyncSession
# from datetime import datetime

# from app.core.database import get_db
# from app.api.deps.auth import get_current_user, AuthUser
# from app.models.all_models import RawFinancialEvent
# from app.models.enums import TxnSourceEnum
# from app.services.ocr_service import extract_text_from_image
# from app.services.ingest_service import process_raw_event

# router = APIRouter()


# @router.post("/{source}")
# async def ingest_event(
#     source: TxnSourceEnum,
#     raw_text: str,
#     sender: str | None = None,
#     db: AsyncSession = Depends(get_db),
#     auth: AuthUser = Depends(get_current_user),
# ):
#     raw = RawFinancialEvent(
#         user_id=auth.user_id,
#         source=source,
#         sender=sender,
#         raw_text=raw_text,
#         received_at=datetime.utcnow(),
#     )

#     db.add(raw)
#     await db.commit()
#     await db.refresh(raw)

#     await process_raw_event(db, raw)

#     return {
#         "status": "accepted",
#         "raw_event_id": str(raw.id),
#     }


# @router.post("/ocr")
# async def ingest_ocr(
#     file: UploadFile = File(...),
#     db: AsyncSession = Depends(get_db),
#     auth: AuthUser = Depends(get_current_user),
# ):
#     image_bytes = await file.read()
#     text = await extract_text_from_image(image_bytes)

#     raw = RawFinancialEvent(
#         user_id=auth.user_id,
#         source=TxnSourceEnum.ocr,
#         raw_text=text,
#     )

#     db.add(raw)
#     await db.commit()
#     await db.refresh(raw)

#     await process_raw_event(db, raw)

#     return {
#         "status": "parsed",
#         "raw_event_id": str(raw.id),
#     }

# app/api/v1/endpoints/ingest.py

from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime

from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.models.all_models import RawFinancialEvent
from app.models.all_models import TxnSourceEnum
from app.services.ocr_service import extract_text_from_image
from app.services.ingest_service import process_raw_event

router = APIRouter()


@router.post("/{source}")
async def ingest_event(
    source: TxnSourceEnum,
    raw_text: str,
    sender: str | None = None,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    raw = RawFinancialEvent(
        user_id=auth.user_id,
        source=source,
        sender=sender,
        raw_text=raw_text,
        received_at=datetime.utcnow(),
    )

    db.add(raw)
    await db.commit()
    await db.refresh(raw)

    await process_raw_event(db, raw)

    return {
        "status": "accepted",
        "raw_event_id": str(raw.id),
    }


@router.post("/ocr")
async def ingest_ocr(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    image_bytes = await file.read()
    text = await extract_text_from_image(image_bytes)

    raw = RawFinancialEvent(
        user_id=auth.user_id,
        source=TxnSourceEnum.ocr,
        raw_text=text,
    )

    db.add(raw)
    await db.commit()
    await db.refresh(raw)

    await process_raw_event(db, raw)

    return {
        "status": "parsed",
        "raw_event_id": str(raw.id),
    }