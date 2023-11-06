import logging
from fastapi import APIRouter, Depends, HTTPException, Query, status
from typing import Annotated, Optional, List
from app.core.models.article import ArticlePutRequest, ArticleGetResponse, Article
from app.core.models.success_response import SuccessResponse
from app.core.services.article_service import ArticleService
from app.infrastructure.database.database import SessionLocal
from util.error_log import get_error_log_info
from app.middleware.auth_middleware import verify_token, get_current_user
from app.core.models.user import User

router = APIRouter()
_logger = logging.getLogger(__name__)

@router.get(
    "/v1/articles",
    summary="記事一覧取得",
    tags=["article"],
)
async def fetch_article(
    article_service: Annotated[ArticleService, Depends(ArticleService)],
    is_published: bool = Query(..., description="投稿済みかどうか"),
    tag_name: str = Query(None, description="タグ名にて検索. 例: Laravel"),
    target_ym: str = Query(None, description="指定年月にて検索. 形式: YYYY-MM"),
) ->  List[ArticleGetResponse]:
    _logger.info("article fetch api start")
    try:
        with SessionLocal.begin() as db:
            articles = article_service.fetch(db, is_published, tag_name, target_ym)
        return articles
    except HTTPException as e:
        _logger.exception(str(e))
        message = get_error_log_info(e)
        raise HTTPException(status_code=500, detail=f"{message}")


@router.get(
    "/v1/articles/{article_id}",
    summary="記事取得",
    tags=["article"]
)
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


@router.put(
    "/v1/articles",
    summary="記事投稿/更新",
    tags=["article"],
    dependencies=[Depends(verify_token)],
)
async def put_article(
    request: ArticlePutRequest,
    article_service: Annotated[ArticleService, Depends(ArticleService)],
    current_user: User = Depends(get_current_user),
) -> SuccessResponse:
    _logger.info("article put api start")
    try:
        if current_user.is_admin() == False:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
        with SessionLocal.begin() as db:
            article_service.put(db, request)
        return SuccessResponse(message='created or updated')
    except HTTPException as e:
        _logger.exception(str(e))
        message = get_error_log_info(e)
        raise HTTPException(status_code=500, detail=f"{message}")


@router.delete(
    "/v1/articles/{article_id}",
    summary="記事を1件削除",
    tags=["article"],
    dependencies=[Depends(verify_token)],
)
async def delete_article(
    article_id: int,
    article_service: Annotated[ArticleService, Depends(ArticleService)],
    current_user: User = Depends(get_current_user),
) -> SuccessResponse:
    _logger.info("article delete api start")
    try:
        if current_user.is_admin() == False:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
        with SessionLocal.begin() as db:
            article_service.delete(db, article_id)
        return SuccessResponse(message='deleted')
    except HTTPException as e:
        _logger.exception(str(e))
        message = get_error_log_info(e)
        raise HTTPException(status_code=500, detail=f"{message}")
