from datetime import datetime
import datetime
from pydantic import BaseModel
from typing import Optional


class ArticleTag(BaseModel):
    id: int
    tag_id: int
    article_id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        orm_mode = True


class ArticleTagPutRequest(BaseModel):
    id: Optional[int]
    tag_id: int
    article_id: int
