import datetime
from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    email: str
    password: str
    role: int
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        orm_mode = True


class UserCreateRequest(BaseModel):
    name: str
    email: str
    password: str
    role: int


class UserLoginRequest(BaseModel):
    email: str
    password: str

class GetUserResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        orm_mode = True