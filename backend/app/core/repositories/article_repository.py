from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import Optional
from app.core.models.article import ArticlePutRequest, Article
from app.infrastructure.database.schema_model.article import ArticleOrm
from util.datetime_generator import DateTimeGenerator


class ArticleRepository:
    def put(
        self,
        db: Session,
        request: ArticlePutRequest,
    ) -> Article:
        now = DateTimeGenerator.datetime()

        if request.id:
            article_data = db.query(ArticleOrm).filter(ArticleOrm.id == request.id).one_or_none()
            if article_data is None:
                raise ValueError('Invalid article id requested.')

            # アップデート
            article = ArticleOrm(
                id=request.id,
                title=request.title,
                content=request.content,
                target_year=now.year,
                target_month=now.month,
                is_published=request.is_published,
            )
            db.add(article)
            db.flush()
        else:
            # 新規作成
            article = ArticleOrm(
                title=request.title,
                content=request.content,
                target_year=now.year,
                target_month=now.month,
                is_published=request.is_published,
            )
            db.add(article)
            db.flush()

        return Article.from_orm(article)

    def get(
        self,
        db: Session,
        id: int,
    ) -> Optional[Article]:
        article = db.scalars(
            select(ArticleOrm)
            .where(ArticleOrm.id == id)
        ).one_or_none()

        if article is None:
            return None
        return Article.from_orm(article)
