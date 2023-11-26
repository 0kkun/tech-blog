from sqlalchemy.orm import Session, selectinload
from sqlalchemy import select
from typing import Optional, List
from app.core.models.image import Image
from app.infrastructure.database.schema_model.image import ImageOrm
from util.datetime_generator import DateTimeGenerator


class ImageRepository:
    def create(
        self,
        db: Session,
        image_url: str,
        is_thumbnail: bool,
    ) -> Image:
        """
            画像urlを保存する
        """
        datetime = DateTimeGenerator()
        now = datetime.now_datetime()

        image = ImageOrm(
            url=image_url,
            is_thumbnail=is_thumbnail,
            created_at=now,
            updated_at=now,
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
        image = db.query(ImageOrm).filter(ImageOrm.id == image_id, ).one_or_none()

        if image is None:
            raise ValueError('Image does not exist')
        db.delete(image)

    def fetchThumbnail(
        self,
        db: Session,
    ) -> List[Image]:
        """
            サムネイル画像のレコード全件取得
        """
        images = db.query(ImageOrm).filter(ImageOrm.is_thumbnail == True, ).all()
        return [Image.from_orm(image) for image in images]

    def get(
        self,
        db: Session,
        image_id: int,
    ) -> Optional[Image]:
        """
            idを指定してサムネイル画像のレコード1件取得
        """
        image = db.query(ImageOrm).filter(ImageOrm.id == image_id, ).one_or_none()
        if image is None:
            return None
        return Image.from_orm(image)
