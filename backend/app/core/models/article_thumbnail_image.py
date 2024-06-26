from datetime import datetime

from pydantic import BaseModel
from typing import List


class ArticleThumbnailImage(BaseModel):
    id: int
    article_id: int
    image_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
