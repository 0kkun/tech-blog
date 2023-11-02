from datetime import datetime
import datetime
from pydantic import BaseModel


class Image(BaseModel):
    id: int
    url: str
    is_thumbnail: bool
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        orm_mode = True

class ImagePostResponse(BaseModel):
    id: int
    url: str

class ImageData(BaseModel):
    id: int
    url: str