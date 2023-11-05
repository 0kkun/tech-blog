from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.models.article import ArticlePutRequest, ArticleGetResponse
from app.core.models.tag import Tag
from app.core.models.article_tag import ArticleTag
from app.core.models.image import Image, ImageData
from app.core.models.article_thumbnail_image import ArticleThumbnailImage
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
        return articles

    def delete(
        self,
        db,
        article_id,
    ):
        self.article_repository.delete(db, article_id)
