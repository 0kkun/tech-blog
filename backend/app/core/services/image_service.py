from fastapi import Depends
from sqlalchemy.orm import Session
from app.core.repositories.image_repository import ImageRepository
from typing import List


class ImageService:
    def __init__(
        self,
        image_repository: ImageRepository = Depends(ImageRepository),
    ):
        self.image_repository = image_repository

    def create(
        self,
        db: Session,
        image_url: str,
        is_thumbnail: bool,
    ):
        return self.image_repository.create(db, image_url, is_thumbnail)

    def delete(
        self,
        db: Session,
        image_id: int,
    ):
        self.image_repository.delete(db, image_id)
