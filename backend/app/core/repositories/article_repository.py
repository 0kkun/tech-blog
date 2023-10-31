from sqlalchemy.orm import Session, selectinload
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
        datetime = DateTimeGenerator()
        now = datetime.now_datetime()

        if request.id:
            article_data = db.query(ArticleOrm).filter(ArticleOrm.id == request.id).one_or_none()
            if article_data is None:
                raise ValueError('Invalid article id requested.')

            # アップデート
            article_data.title = request.title
            article_data.content = request.content
            article_data.target_year = now.year
            article_data.target_month = now.month
            article_data.is_published = request.is_published
            article_data.updated_at = now

            db.add(article_data)
            db.flush()
            return Article.from_orm(article_data)
        else:
            # 新規作成
            article = ArticleOrm(
                title = request.title,
                content = request.content,
                target_year = now.year,
                target_month = now.month,
                is_published = request.is_published,
                created_at = now,
                updated_at = now,
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


    def fetch_article(
        self,
        db: Session,
        is_published: bool,
    ) -> Optional[List[Article]]:
        """
            記事一覧取得
        """
        articles = db.query(ArticleOrm).filter(
            ArticleOrm.is_published == is_published,
        ).order_by(ArticleOrm.updated_at.desc()).all()
        article_list = [Article.from_orm(article) for article in articles]
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
