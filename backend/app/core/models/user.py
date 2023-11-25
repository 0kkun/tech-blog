from datetime import datetime
from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    id: int
    name: str
    email: str
    password: str
    role: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

    def is_admin(self):
        if self.role == 0:
            return True
        else:
            return False

class UserCreateRequest(BaseModel):
    name: str
    email: str
    password: str
    role: int
    secret_key: Optional[str] 


class UserLoginRequest(BaseModel):
    email: str
    password: str

class LoginSuccessReposnse(BaseModel):
    token: str
    token_type: str

class GetUserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: int

    class Config:
        orm_mode = True

class UpdateUserRequest(BaseModel):
    id: int
    name: str
    email: str
    password: str
    role: int