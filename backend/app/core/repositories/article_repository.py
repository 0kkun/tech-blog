from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import Optional, List
from app.core.models.article import ArticlePutRequest, Article
from app.infrastructure.database.schema_model.article import ArticleOrm
from util.datetime_generator import DateTimeGenerator


class ArticleRepository:
    def put(
        self,
        db: Session,
        request: ArticlePutRequest,
    ) -> Article:
        """
            記事を新規作成 or 更新する
        """
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
        """
            idを指定して記事を1件取得する
        """
        article = db.scalars(
            select(ArticleOrm)
            .where(ArticleOrm.id == id)
        ).one_or_none()

        if article is None:
            return None
        return Article.from_orm(article)


    def fetchPublishedArticle(
        self,
        db: Session,
    ) -> Optional[List[Article]]:
        """
            記事一覧取得
        """
        articles = db.query(ArticleOrm).filter(
            ArticleOrm.is_published == True,
        ).all()
        article_list = [Article.from_orm(articles) for article in articles]
        return article_list


    def delete(
        self,
        db: Session,
        article_id: int,
    ) -> None:
        """
            記事1件削除
        """
        article = db.query(ArticleOrm).filter(
            ArticleOrm.id == article_id,
        ).one_or_none()

        if article is None:
            raise ValueError('Article does not exist')
        
        db.delete(article)