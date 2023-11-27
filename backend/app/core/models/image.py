from datetime import datetime
from pydantic import BaseModel


class Image(BaseModel):
    id: int
    url: str
    is_thumbnail: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class ImagePostResponse(BaseModel):
    id: int
    url: str


class ImageData(BaseModel):
    id: int
    url: str
