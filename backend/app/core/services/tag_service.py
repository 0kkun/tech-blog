from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.models.tag import TagPutRequest
from app.core.repositories.tag_repository import TagRepository


class TagService:
    def __init__(
            self,
            tag_repository: TagRepository = Depends(TagRepository),
    ):
        self.tag_repository = tag_repository

    def put(
        self,
        db: Session,
        request: TagPutRequest,
    ):
        return self.tag_repository.put(db, request)

    def get(
        self,
        db: Session,
        tag_id: int,
    ):
        return self.tag_repository.get(db, tag_id)

    def fetch(
        self,
        db,
    ):
        return self.tag_repository.fetch(db)

    def delete(
        self,
        db,
        tag_id,
    ):
        self.tag_repository.delete(db, tag_id)
