from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import Optional, List
from app.core.models.article_tag import ArticleTag
from app.infrastructure.database.schema_model.article_tag import ArticleTagOrm
from util.datetime_generator import DateTimeGenerator


class ArticleTagRepository:
    def put(
        self,
        db: Session,
        article_id: int,
        tag_ids: List[int]
    ) -> ArticleTag:
        """
            記事に紐づいたタグを新規作成 or 更新する
        """
        datetime = DateTimeGenerator()
        now = datetime.datetime()
        # 既存の記事に紐づくタグを削除
        db.query(ArticleTagOrm).filter(ArticleTagOrm.article_id == article_id).delete()

        # 新規作成
        article_tags = []
        for tag_id in tag_ids:
            article_tag = ArticleTagOrm(
                article_id=article_id,
                tag_id=tag_id,
                created_at=now,
                updated_at=now,
            )
            db.add(article_tag)
            article_tags.append(article_tag)
        db.flush()
        return [ArticleTag.from_orm(article_tag) for article_tag in article_tags]



    def get(
        self,
        db: Session,
        article_tag_id: int,
    ) -> Optional[ArticleTag]:
        """
            idを指定してタグを1件取得する
        """
        article_tag = db.scalars(
            select(ArticleTagOrm)
            .where(ArticleTagOrm.id == article_tag_id)
        ).one_or_none()

        if article_tag is None:
            return None
        return ArticleTag.from_orm(article_tag)


    def fetch_by_article_id(
        self,
        db: Session,
        article_id: int,
    ) -> Optional[List[ArticleTag]]:
        """
            記事のタグ一覧取得
        """
        article_tags = db.scalars(
            select(ArticleTagOrm)
            .where(ArticleTagOrm.article_id == article_id)
        ).all()
        return [ArticleTag.from_orm(article_tag) for article_tag in article_tags]


    def fetch_by_article_ids(
        self,
        db: Session,
        article_ids: List[int],
    ) -> Optional[List[ArticleTag]]:
        """
        記事のタグ一覧を一括で取得
        """
        if not article_ids:
            return []

        # whereInで一括取得
        article_tags = db.scalars(
            select(ArticleTagOrm)
            .where(ArticleTagOrm.article_id.in_(article_ids))
        ).all()
        return [ArticleTag.from_orm(article_tag) for article_tag in article_tags]


    def delete_by_article_id(
        self,
        db: Session,
        article_id: int,
    ) -> None:
        """
            タグ1件削除
        """
        article_tags = db.query(ArticleTagOrm).filter(
            ArticleTagOrm.article_id == article_id,
        ).all()

        if article_tags is None:
            raise ValueError('Tag does not exist')

        for article_tag in article_tags:
            db.delete(article_tag)