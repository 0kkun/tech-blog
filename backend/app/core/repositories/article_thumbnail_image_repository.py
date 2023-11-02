from sqlalchemy.orm import Session, selectinload
from sqlalchemy import select
from typing import Optional, List
from app.core.models.article_thumbnail_image import ArticleThumbnailImage
from app.infrastructure.database.schema_model.article_thumbnail_image import ArticleThumbnailImageOrm
from util.datetime_generator import DateTimeGenerator


class ArticleThumbnailImageRepository:
    def put(
        self,
        db: Session,
        article_id,
        thumbnail_image_id: int,
    ) -> ArticleThumbnailImage:
        """
            記事と画像を関連づけるレコードを生成・更新する
        """
        datetime = DateTimeGenerator()
        now = datetime.now_datetime()
        # 既存の記事に紐づく画像を削除
        db.query(ArticleThumbnailImageOrm).filter(ArticleThumbnailImageOrm.article_id == article_id).delete()

        # 新規作成
        article_thumbnail_image = ArticleThumbnailImageOrm(
            article_id=article_id,
            image_id=thumbnail_image_id,
            created_at=now,
            updated_at=now,
        )
        db.add(article_thumbnail_image)
        db.flush()
        return ArticleThumbnailImage.from_orm(article_thumbnail_image)


    def get(
        self,
        db: Session,
        article_thumbnail_image_id: int,
    ) -> Optional[ArticleThumbnailImage]:
        """
            idを指定して1件取得する
        """
        article_image = db.scalars(
            select(ArticleThumbnailImageOrm)
            .where(ArticleThumbnailImageOrm.id == article_thumbnail_image_id)
        ).one_or_none()

        if article_image is None:
            return None
        return ArticleThumbnailImage.from_orm(article_image)


    def get_by_article_id(
        self,
        db: Session,
        article_id: int,
    ) -> Optional[ArticleThumbnailImage]:
        """
            記事に紐づくサムネイル画像1件取得
        """
        article_thumbnail_image = db.scalars(
            select(ArticleThumbnailImageOrm)
            .where(ArticleThumbnailImageOrm.article_id == article_id)
        ).one_or_none()

        if article_thumbnail_image is None:
            return None
        return ArticleThumbnailImage.from_orm(article_thumbnail_image)


    def fetch(
        self,
        db: Session,
    ) -> Optional[List[ArticleThumbnailImage]]:
        """
            全件取得
        """
        article_images = db.query(ArticleThumbnailImageOrm).all()
        return [ArticleThumbnailImage.from_orm(article_image) for article_image in article_images]