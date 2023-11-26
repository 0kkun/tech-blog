from fastapi import Depends
from sqlalchemy.orm import Session
from datetime import datetime

from app.core.models.article import ArticlePutRequest, ArticleGetResponse, Article, ArticleArchiveFetchResponse
from app.core.repositories.article_repository import ArticleRepository
from app.core.repositories.article_tag_repository import ArticleTagRepository
from app.core.repositories.tag_repository import TagRepository
from app.core.repositories.article_image_repository import ArticleImageRepository
from app.core.repositories.article_thumbnail_image_repository import ArticleThumbnailImageRepository
from app.core.repositories.image_repository import ImageRepository
from typing import List, Optional


class ArticleService:
    def __init__(
        self,
        article_repository: ArticleRepository = Depends(ArticleRepository),
        article_tag_repository: ArticleTagRepository = Depends(ArticleTagRepository),
        tag_repository: TagRepository = Depends(TagRepository),
        article_image_repository: ArticleImageRepository = Depends(ArticleImageRepository),
        article_thumbnail_image_repository: ArticleThumbnailImageRepository = Depends(ArticleThumbnailImageRepository),
        image_repository: ImageRepository = Depends(ImageRepository),
    ):
        self.article_repository = article_repository
        self.article_tag_repository = article_tag_repository
        self.tag_repository = tag_repository
        self.article_image_repository = article_image_repository
        self.article_thumbnail_image_repository = article_thumbnail_image_repository
        self.image_repository = image_repository

    def put(
        self,
        db: Session,
        request: ArticlePutRequest,
    ):
        article = self.article_repository.put(db, request)
        if request.tags:
            # 新規作成の場合は生成したてのレコードのidを挿入する必要がある
            tag_ids = [tag.id for tag in request.tags]
            self.article_tag_repository.put(db, article.id, tag_ids)

        if request.images:
            image_ids = [image.id for image in request.images]
            self.article_image_repository.put(db, article.id, image_ids)

        if request.thumbnail_image:
            self.article_thumbnail_image_repository.put(db, article.id, request.thumbnail_image.id)

    def get(
        self,
        db: Session,
        article_id: int,
    ):
        article = self.article_repository.get(db, article_id)
        return article

    def fetch(
        self,
        db,
        is_published: bool,
        tag_name: Optional[str],
        target_ym: Optional[str],
    ) -> List[ArticleGetResponse]:
        articles = self.article_repository.fetch_article(db, is_published, target_ym)
        if tag_name is None:
            return self.__make_fetch_response(articles)
        else:
            # タグ名が指定された場合は検索して返す
            articles = [article for article in articles if any(tag.name == tag_name for tag in article.tags)]
            return self.__make_fetch_response(articles)

    def delete(
        self,
        db,
        article_id,
    ):
        self.article_repository.delete(db, article_id)

    def fetch_archives(
        self,
        db,
    ) -> list[ArticleArchiveFetchResponse]:
        article_archives = self.article_repository.fetch_article_archives(db)
        archives = [ArticleArchiveFetchResponse.from_archive(archive) for archive in article_archives]
        # 重複を除去して返す
        return list({archive.target_ym: archive for archive in archives}.values())

    def __make_fetch_response(self, articles: List[Article]) -> List[ArticleGetResponse]:
        # yapf: disable
        result = [
            ArticleGetResponse(
                id=article.id,
                title=article.title,
                content=article.content,
                target_year=article.target_year,
                target_month=article.target_month,
                is_published=article.is_published,
                created_at=article.created_at,
                updated_at=article.updated_at,
                tags=article.tags,
                thumbnail_image=article.thumnail_image,
                access_count=sum(1 for log in article.access_logs if log.article_id == article.id)
            )
            for article in articles
        ]
        # yapf: enable
        return result
