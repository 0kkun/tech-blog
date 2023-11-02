from datetime import datetime
import datetime
from pydantic import BaseModel
from typing import Optional, List
from app.core.models.tag import Tag, TagRequest, TagResponse
from app.core.models.article_tag import ArticleTagPutRequest
from app.core.models.image import ImageData

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
    images: Optional[List[ImageData]]
    thumbnail_image: Optional[ImageData]


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
    thumbnail_image: Optional[ImageData]


class ArticleFetchResponse(BaseModel):
    articles: List[Optional[ArticleGetResponse]]