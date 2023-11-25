import logging
from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated, Optional, List
from app.core.models.access_log import AccessLogPutRequest
from app.core.models.success_response import SuccessResponse
from app.core.services.access_log_service import AccessLogService
from app.infrastructure.database.database import SessionLocal
from util.error_log import get_error_log_info


router = APIRouter()
_logger = logging.getLogger(__name__)

@router.post(
    "/v1/access_logs",
    summary="アクセスログを記録する",
    tags=["access_log"],
)
async def store_access_log(
    request: AccessLogPutRequest,
    access_log_service: Annotated[AccessLogService, Depends(AccessLogService)],
) -> SuccessResponse:
    _logger.info("create access log api start")
    try:
        with SessionLocal.begin() as db:
            access_log_service.create(db, request)
        return SuccessResponse(message='Created')
    except HTTPException as e:
        _logger.exception(str(e))
        message = get_error_log_info(e)
        raise HTTPException(status_code=500, detail=f"{message}")

