from datetime import datetime
import datetime
from pydantic import BaseModel


class Token(BaseModel):
    id: int
    token: str
    user_id: int
    expired_at: datetime.datetime
    last_login_at: datetime.datetime
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        orm_mode = True

class PutTokenRequest(BaseModel):
    token: str
    user_id: int
    expired_at: datetime.datetime