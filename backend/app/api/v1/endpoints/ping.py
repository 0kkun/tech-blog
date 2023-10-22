from fastapi import APIRouter
import logging
from app.core.models.ping import Ping, PingResponse


router = APIRouter()
_logger = logging.getLogger(__name__)

@router.get("/ping", summary="アプリからの疎通確認用", tags=["debug"])
async def ping() -> PingResponse:
    _logger.info("ping api start")
    response = Ping(message="OK")
    return PingResponse(data=response)
