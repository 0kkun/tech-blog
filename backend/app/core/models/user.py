import datetime
from pydantic import BaseModel

from app.core.models.token import Token


class User(BaseModel):
    id: int
    name: str
    email: str
    password: str
    role: int
    token: Token
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        orm_mode = True
