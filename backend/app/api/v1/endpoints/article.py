import logging
from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated
from app.core.models.article import Article, ArticlePutRequest
from app.core.services.article_service import ArticleService
from app.infrastructure.database.database import SessionLocal
from util.error_log import get_error_log_info


router = APIRouter()
_logger = logging.getLogger(__name__)

@router.put("/v1/article", summary="記事投稿/更新", tags=["article"])
async def put_article(
    request: ArticlePutRequest,
    article_service: Annotated[ArticleService, Depends(ArticleService)]
) -> Article:
    _logger.info("article put api start")
    try:
        with SessionLocal.begin() as db:
            article = article_service.put(db, request)

        return article

    except HTTPException as e:
        _logger.exception(str(e))
        message = get_error_log_info(e)
        raise HTTPException(status_code=500, detail=f"{message}")


@router.get("/v1/article/{article_id}", summary="記事取得", tags=["article"])
async def get_article(
    article_id: int,
    article_service: Annotated[ArticleService, Depends(ArticleService)],
) -> Article:
    _logger.info("article get api start")
    try:
        with SessionLocal.begin() as db:
            article = article_service.get(db, article_id)

        return article

    except HTTPException as e:
        _logger.exception(str(e))
        message = get_error_log_info(e)
        raise HTTPException(status_code=500, detail=f"{message}")