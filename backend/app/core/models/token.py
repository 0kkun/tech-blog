from datetime import datetime
from pydantic import BaseModel


class Token(BaseModel):
    id: int
    token: str
    user_id: int
    expired_at: datetime
    last_login_at: datetime
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class PutTokenRequest(BaseModel):
    token: str
    user_id: int
    expired_at: datetime