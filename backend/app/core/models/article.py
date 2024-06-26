from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List
from app.core.models.tag import Tag, TagRequest, TagResponse
from app.core.models.image import ImageData, Image
from app.core.models.access_log import AccessLog


class Article(BaseModel):
    id: int
    title: str
    content: str
    target_year: int
    target_month: int
    is_published: bool
    created_at: datetime
    updated_at: datetime
    # リレーション (1:多)
    tags: Optional[List[Tag]]
    # リレーション (1:1)
    thumnail_image: Optional[Image]
    # リレーション (1:多)
    access_logs: Optional[List[AccessLog]]

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
    created_at: datetime
    updated_at: datetime
    tags: Optional[List[TagResponse]]
    thumbnail_image: Optional[ImageData]
    access_count: int


class ArticleFetchResponse(BaseModel):
    articles: List[Optional[ArticleGetResponse]]


class ArticleArchive(BaseModel):
    created_at: datetime

    class Config:
        orm_mode = True


class ArticleArchiveFetchResponse(BaseModel):
    target_ym: str
    title: str

    @classmethod
    def from_archive(cls, archive: ArticleArchive):
        created_at = datetime.fromisoformat(str(archive.created_at))
        target_ym = f"{created_at.year}-{created_at.month:02d}"
        title = created_at.strftime("%B %Y")
        return cls(target_ym=target_ym, title=title)
