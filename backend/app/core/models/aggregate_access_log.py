from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class AggregateAccessLog(BaseModel):
    id: int
    visit_url: str
    article_id: Optional[int]
    target_year: int
    target_month: int
    access_count: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
