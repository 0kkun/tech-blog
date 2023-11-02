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
        article_tags = self.article_tag_repository.fetch_by_article_id(db, article_id)
        tags = self.tag_repository.fetch(db)
        article_thumbnail_image = self.article_thumbnail_image_repository.get_by_article_id(db, article_id)
        thumbnail_image = self.image_repository.get(db, article_thumbnail_image.image_id)

        # 記事に関連するタグの抽出ロジックを追加
        related_tags = self.__make_related_tags(article_tags, tags, article_id)

        # ArticleGetResponseオブジェクトを作成し、tagsフィールドに関連するタグを設定
        return ArticleGetResponse(
            id=article.id,
            title=article.title,
            content=article.content,
            target_year=article.target_year,
            target_month=article.target_month,
            is_published=article.is_published,
            created_at=article.created_at,
            updated_at=article.updated_at,
            tags=related_tags,
            thumbnail_image=ImageData(id=thumbnail_image.id, url=thumbnail_image.url),
        )

    def fetch(
        self,
        db,
        is_published: bool,
    ) -> List[ArticleGetResponse]:
        articles = self.article_repository.fetch_article(db, is_published)
        article_ids = [article.id for article in articles]
        article_tags = self.article_tag_repository.fetch_by_article_ids(db, article_ids)
        tags = self.tag_repository.fetch(db)
        article_thumbnail_images = self.article_thumbnail_image_repository.fetch(db)
        thumbnail_images = self.image_repository.fetchThumbnail(db)

        article_list = []
        for article in articles:
            related_tags = self.__make_related_tags(article_tags, tags, article.id)
            related_thumbnail_image = self.__make_related_thumbnail(article_thumbnail_images, thumbnail_images, article.id)
            article_list.append(ArticleGetResponse(
                id=article.id,
                title=article.title,
                content=article.content,
                target_year=article.target_year,
                target_month=article.target_month,
                is_published=article.is_published,
                created_at=article.created_at,
                updated_at=article.updated_at,
                tags=related_tags,
                thumbnail_image=related_thumbnail_image,
            ))
        return article_list

    def delete(
        self,
        db,
        article_id,
    ):
        self.article_repository.delete(db, article_id)


    def __make_related_tags(self, article_tags: List[ArticleTag], tags: List[Tag], article_id: int) -> list[Tag]:
        """
            記事に関連するタグの抽出ロジック
        """
        article_tags = [article_tag for article_tag in article_tags if article_tag.article_id == article_id]
        tag_ids = [article_tag.tag_id for article_tag in article_tags]
        return [tag for tag in tags if tag.id in tag_ids]


    def __make_related_thumbnail(
        self,
        article_thumbnail_images: List[ArticleThumbnailImage],
        thumbnail_images: List[Image],
        article_id: int
    ) -> Optional[ImageData]:
        """
            記事に紐づくサムネイル画像抽出ロジック
        """
        image_id_for_thumbnail = None
        # 中間テーブルから記事のサムネイル画像IDを探す
        for article_thumbnail in article_thumbnail_images:
            if article_thumbnail.article_id == article_id:
                image_id_for_thumbnail = article_thumbnail.image_id

        if image_id_for_thumbnail is None:
            return None

        # 画像IDから画像レコードを探す
        for thumbnail_image in thumbnail_images:
            if thumbnail_image.id == image_id_for_thumbnail:
                return ImageData(id=thumbnail_image.id, url=thumbnail_image.url)