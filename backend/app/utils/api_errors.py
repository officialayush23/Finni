# app/api/utils/api_errors.py
from fastapi import HTTPException

def api_error(code: str, message: str, status: int = 400):
    raise HTTPException(
        status_code=status,
        detail={
            "error_code": code,
            "message": message,
        },
    )
