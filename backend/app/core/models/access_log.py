from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class AccessLog(BaseModel):
    id: int
    visit_url: str
    user_agent: str
    article_id: Optional[int]
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
