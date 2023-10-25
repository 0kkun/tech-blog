from datetime import datetime
import datetime
from pydantic import BaseModel


class Image(BaseModel):
    id: int
    url: str
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        orm_mode = True

class ImagePostRequest(BaseModel):
    url: str

class ImagePostResponse(BaseModel):
    id: int
    url: str
