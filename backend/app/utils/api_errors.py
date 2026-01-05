# app/utils/api_errors.py
from fastapi import HTTPException
from typing import Optional, Dict, Any


def api_error(
    code: str,
    message: str,
    status: int = 400,
    details: Optional[Dict[str, Any]] = None,
) -> HTTPException:
    """
    Standardized error response for all API endpoints.
    
    Args:
        code: Error code (e.g., "BUDGET_NOT_FOUND", "CONFLICT_DETECTED")
        message: Human-readable error message
        status: HTTP status code (default 400)
        details: Optional additional error details
    
    Returns:
        HTTPException with standardized format
    """
    error_detail = {
        "error_code": code,
        "message": message,
    }
    
    if details:
        error_detail["details"] = details
    
    raise HTTPException(
        status_code=status,
        detail=error_detail,
    )
