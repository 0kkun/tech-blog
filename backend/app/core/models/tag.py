from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class Tag(BaseModel):
    id: int
    name: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class TagPutRequest(BaseModel):
    id: Optional[int]
    name: str

class TagRequest(BaseModel):
    id: int
    name: str

class TagResponse(BaseModel):
    id: int
    name: str
    class Config:
        orm_mode = True