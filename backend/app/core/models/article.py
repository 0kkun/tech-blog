from datetime import datetime
import datetime
from pydantic import BaseModel
from typing import Optional, List
from app.core.models.tag import Tag, TagRequest, TagResponse
from app.core.models.article_tag import ArticleTagPutRequest

class Article(BaseModel):
    id: int
    title: str
    content: str
    target_year: int
    target_month: int
    is_published: bool
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        orm_mode = True


class ArticlePutRequest(BaseModel):
    id: Optional[int] = None
    title: str
    content: str
    is_published: bool
    tags: List[TagRequest]


class ArticleGetResponse(BaseModel):
    id: int
    title: str
    content: str
    target_year: int
    target_month: int
    is_published: bool
    created_at: datetime.datetime
    updated_at: datetime.datetime
    tags: Optional[List[TagResponse]]


class ArticleFetchResponse(BaseModel):
    articles: List[Optional[ArticleGetResponse]]