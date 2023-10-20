from datetime import datetime
import datetime
from pydantic import BaseModel
from typing import Optional


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
    id: Optional[int]
    title: str
    content: str
    is_published: bool
