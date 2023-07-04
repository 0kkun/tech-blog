from fastapi import APIRouter
from pydantic import BaseModel
import logging


router = APIRouter()
_logger = logging.getLogger(__name__)

class Ping(BaseModel):
    message: str

class PingResponse(BaseModel):
    data: Ping

@router.get("/ping", summary="アプリからの疎通確認用", tags=["debug"])
async def ping() -> PingResponse:
    _logger.info("ping api start")
    response = Ping(message="OK")
    return PingResponse(data=response)
