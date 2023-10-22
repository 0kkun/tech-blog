from datetime import datetime
import datetime
from pydantic import BaseModel
from typing import Optional


class Tag(BaseModel):
    id: int
    name: str
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        orm_mode = True


class TagPutRequest(BaseModel):
    id: Optional[int]
    name: str
