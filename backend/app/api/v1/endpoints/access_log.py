import logging
from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Annotated, Optional, List
from app.core.models.access_log import AccessLogPutRequest, FetchDailyTolalAccessLogResponse
from app.core.models.success_response import SuccessResponse
from app.core.services.access_log_service import AccessLogService
from app.infrastructure.database.database import SessionLocal
from util.error_log import get_error_log_info
from app.middleware.auth_middleware import verify_token

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
        return SuccessResponse(message="Created")
    except HTTPException as e:
        _logger.exception(str(e))
        message = get_error_log_info(e)
        raise HTTPException(status_code=500, detail="Server Error")


@router.get(
    "/v1/access_logs",
    summary="アクセスログを取得する",
    tags=["access_log"],
    # dependencies=[Depends(verify_token)],
)
async def fetch_access_logs(
    access_log_service: Annotated[AccessLogService, Depends(AccessLogService)],
    target_year: str = Query(..., description="指定年にて検索."),
    target_month: str = Query(..., description="指定月にて検索."),
) -> List[FetchDailyTolalAccessLogResponse]:
    _logger.info("fetch access logs api start")
    try:
        with SessionLocal.begin() as db:
            access_logs = access_log_service.fetch_daily_total(db, target_year, target_month)
        return access_logs
    except HTTPException as e:
        _logger.exception(str(e))
        message = get_error_log_info(e)
        raise HTTPException(status_code=500, detail=f"{message}")
