from sqlalchemy.orm import Session, selectinload
from sqlalchemy import select
from typing import Optional, List
from app.core.models.article_image import ArticleImage
from app.infrastructure.database.schema_model.article_image import ArticleImageOrm
from util.datetime_generator import DateTimeGenerator


class ArticleImageRepository:
    def put(
        self,
        db: Session,
        article_id,
        image_ids: List[int],
    ):
        """
        記事と画像を関連づけるレコードを生成・更新する
        """
        datetime = DateTimeGenerator()
        now = datetime.now_datetime()
        # 既存の記事に紐づく画像を削除
        db.query(ArticleImageOrm).filter(ArticleImageOrm.article_id == article_id).delete()

        # 新規作成
        article_images = []
        for image_id in image_ids:
            article_image = ArticleImageOrm(
                article_id=article_id,
                image_id=image_id,
                created_at=now,
                updated_at=now,
            )
            db.add(article_image)
            article_images.append(article_image)
        db.flush()
        return [ArticleImage.from_orm(article_image) for article_image in article_images]

    def get(
        self,
        db: Session,
        article_image_id: int,
    ) -> Optional[ArticleImage]:
        """
        idを指定して1件取得する
        """
        # yapf: disable
        article_image = db.scalars(
            select(ArticleImageOrm)
            .where(ArticleImageOrm.id == article_image_id)
        ).one_or_none()
        # yapf: enable
        if article_image is None:
            return None
        return ArticleImage.from_orm(article_image)

    def fetch_by_article_id(
        self,
        db: Session,
        article_id: int,
    ) -> Optional[List[ArticleImage]]:
        """
        記事に紐づく画像ID一覧取得
        """
        # yapf: disable
        article_images = db.scalars(
            select(ArticleImageOrm)
            .where(ArticleImageOrm.article_id == article_id)
        ).all()
        # yapf: enable
        return [ArticleImage.from_orm(article_image) for article_image in article_images]
