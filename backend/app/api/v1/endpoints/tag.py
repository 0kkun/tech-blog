import logging
from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated, Optional, List
from app.core.models.tag import Tag, TagPutRequest, TagRequest
from app.core.models.success_response import SuccessResponse
from app.core.services.tag_service import TagService
from app.infrastructure.database.database import SessionLocal
from util.error_log import get_error_log_info


router = APIRouter()
_logger = logging.getLogger(__name__)

@router.get("/v1/tags", summary="タグ一覧取得", tags=["tag"])
async def fetch_tag(
    tag_service: Annotated[TagService, Depends(TagService)],
):
    _logger.info('tag fetch api start')
    try:
        with SessionLocal.begin() as db:
            tags = tag_service.fetch(db)
        return tags

    except HTTPException as e:
        _logger.exception(str(e))
        message = get_error_log_info(e)
        raise HTTPException(status_code=500, detail=f"{message}")


@router.put("/v1/tags", summary="タグ登録/更新", tags=["tag"])
async def put_tag(
    request: TagPutRequest,
    tag_service: Annotated[TagService, Depends(TagService)]
) -> SuccessResponse:
    _logger.info("tag put api start")
    try:
        with SessionLocal.begin() as db:
            tag_service.put(db, request)

        return SuccessResponse(message='created or updated')

    except HTTPException as e:
        _logger.exception(str(e))
        message = get_error_log_info(e)
        raise HTTPException(status_code=500, detail=f"{message}")


@router.delete("/v1/tags/{tag_id}", summary="タグを1件削除", tags=["tag"])
async def delete_tag(
    tag_id: int,
    tag_service: Annotated[TagService, Depends(TagService)],
) -> SuccessResponse:
    _logger.info("tag delete api start")
    try:
        with SessionLocal.begin() as db:
            tag_service.delete(db, tag_id)

        return SuccessResponse(message='deleted')

    except HTTPException as e:
        _logger.exception(str(e))
        message = get_error_log_info(e)
        raise HTTPException(status_code=500, detail=f"{message}")
