from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List


class ArticleTag(BaseModel):
    id: int
    tag_id: int
    article_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class ArticleTagPutRequest(BaseModel):
    article_id: int
    tag_ids: List[int]
