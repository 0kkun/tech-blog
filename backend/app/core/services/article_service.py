from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.models.article import ArticlePutRequest, ArticleGetResponse, ArticleFetchResponse, Article
from app.core.models.tag import Tag
from app.core.models.article_tag import ArticleTag
from app.core.repositories.article_repository import ArticleRepository
from app.core.repositories.article_tag_repository import ArticleTagRepository
from app.core.repositories.tag_repository import TagRepository
from typing import List

class ArticleService:
    def __init__(
        self,
        article_repository: ArticleRepository = Depends(ArticleRepository),
        article_tag_repository: ArticleTagRepository = Depends(ArticleTagRepository),
        tag_repository: TagRepository = Depends(TagRepository),
    ):
        self.article_repository = article_repository
        self.article_tag_repository = article_tag_repository
        self.tag_repository = tag_repository

    def put(
        self,
        db: Session,
        request: ArticlePutRequest,
    ):
        self.article_repository.put(db, request)
        if request.tags:
            tag_ids = [tag.id for tag in request.tags]
            self.article_tag_repository.put(db, request.id, tag_ids)

    def get(
        self,
        db: Session,
        article_id: int,
    ):
        article = self.article_repository.get(db, article_id)
        article_tags = self.article_tag_repository.fetch_by_article_id(db, article_id)
        tags = self.tag_repository.fetch(db)

        # 記事に関連するタグの抽出ロジックを追加
        related_tags = self.__make_related_tags(article_tags, tags, article_id)

        # ArticleGetResponseオブジェクトを作成し、tagsフィールドに関連するタグを設定
        return ArticleGetResponse(
            id=article.id,
            title=article.title,
            content=article.content,
            target_year=article.target_year,
            target_month=article.target_month,
            is_published=article.is_published,
            created_at=article.created_at,
            updated_at=article.updated_at,
            tags=related_tags,
        )

    def fetch(
        self,
        db,
    ) -> List[ArticleGetResponse]:
        articles = self.article_repository.fetch_published_article(db)
        article_ids = [article.id for article in articles]
        article_tags = self.article_tag_repository.fetch_by_article_ids(db, article_ids)
        tags = self.tag_repository.fetch(db)

        article_list = []
        for article in articles:
            related_tags = self.__make_related_tags(article_tags, tags, article.id)
            article_list.append(ArticleGetResponse(
                id=article.id,
                title=article.title,
                content=article.content,
                target_year=article.target_year,
                target_month=article.target_month,
                is_published=article.is_published,
                created_at=article.created_at,
                updated_at=article.updated_at,
                tags=related_tags,
            ))

        return article_list

    def delete(
        self,
        db,
        article_id,
    ):
        self.article_repository.delete(db, article_id)


    def __make_related_tags(self, article_tags: List[ArticleTag], tags: List[Tag], article_id: int) -> list[Tag]:
        """
            記事に関連するタグの抽出ロジック
        """
        article_tags = [article_tag for article_tag in article_tags if article_tag.article_id == article_id]
        tag_ids = [article_tag.tag_id for article_tag in article_tags]
        return [tag for tag in tags if tag.id in tag_ids]
