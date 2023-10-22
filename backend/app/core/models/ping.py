from pydantic import BaseModel

class Ping(BaseModel):
    message: str

class PingResponse(BaseModel):
    data: Ping