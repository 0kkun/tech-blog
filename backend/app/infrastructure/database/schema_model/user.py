from sqlalchemy import Column, String, Integer, BigInteger, DateTime
from sqlalchemy.orm import relationship
import datetime

from app.infrastructure.database.database import Base

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

    # Token.userで関連付けを使用してデータが取得できるようになる
    tokens = relationship("Token", backref="user")

