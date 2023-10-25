from sqlalchemy.orm import Session, selectinload
from sqlalchemy import select
from typing import Optional, List
from app.core.models.image import Image, ImagePostRequest
from app.infrastructure.database.schema_model.image import ImageOrm
from util.datetime_generator import DateTimeGenerator


class ImageRepository:
    def create(
        self,
        db: Session,
        request: ImagePostRequest,
    ) -> Image:
        """
            画像urlを保存する
        """
        datetime = DateTimeGenerator()
        now = datetime.datetime()

        image = ImageOrm(
            url = request.url,
            created_at = now,
            updated_at = now,
        )
        db.add(image)
        db.flush()
        return Image.from_orm(image)


    def delete(
        self,
        db: Session,
        image_id: int,
    ) -> None:
        """
            画像レコード1件削除
        """
        image = db.query(ImageOrm).filter(
            ImageOrm.id == image_id,
        ).one_or_none()

        if image is None:
            raise ValueError('Image does not exist')
        db.delete(image)
