from db.database import Base
from sqlalchemy import Column, String, Integer, BigInteger, DateTime
from sqlalchemy.orm import relationship
import datetime
from pydantic import BaseModel
from models.token import Token


class UserOrm(Base):
    __tablename__ = "users"
    __table_args__ = {"comment": "usersテーブル"}

    id = Column(BigInteger, primary_key=True, nullable=False, autoincrement=True)
    name = Column(String(255), nullable=False, comment="ユーザー名")
    email = Column(String(255), unique=True, comment="メールアドレス")
    password = Column(String(255), comment="パスワード")
    role = Column(Integer, default=1, comment="ロール. 0:admin, 1:member")
    created_at = Column(DateTime(timezone=True), nullable=False, default=datetime.datetime.now)
    updated_at = Column(
        DateTime(timezone=True), nullable=False, default=datetime.datetime.now, onupdate=datetime.datetime.now
    )

    tokens = relationship("Token", backref="user")


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
