from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.models.article import ArticlePutRequest
from app.core.repositories.article_repository import ArticleRepository


class ArticleService:
    def __init__(
        self,
        article_repository: ArticleRepository = Depends(ArticleRepository),
    ):
        self.article_repository = article_repository

    def put(
        self,
        db: Session,
        request: ArticlePutRequest,
    ):
        return self.article_repository.put(db, request)

    def get(
        self,
        db: Session,
        id: int,
    ):
        return self.article_repository.get(db, id)

    def fetch(
        self,
        db,
    ):
        return self.article_repository.fetchPublishedArticle(db)

    def delete(
        self,
        db,
        article_id,
    ):
        self.article_repository.delete(db, article_id)