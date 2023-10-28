from sqlalchemy import Column, String, BigInteger, ForeignKey, DateTime
from datetime import datetime
import datetime
from sqlalchemy.orm import relationship

from app.infrastructure.database.database import Base

class TokenOrm(Base):
    __tablename__ = "tokens"
    __table_args__ = {"comment": "トークンテーブル"}

    id = Column(BigInteger, primary_key=True, nullable=False, autoincrement=True)
    token = Column(String(255), unique=True, nullable=False, comment="アクセストークン")
    user_id = Column(BigInteger, ForeignKey("users.id"), nullable=False, comment="ユーザーID")
    expired_at = Column(DateTime, default=datetime.datetime.now, nullable=False, comment="トークンの有効期限")
    last_login_at = Column(DateTime, default=datetime.datetime.now, nullable=False, comment="最終ログイン日時")
    created_at = Column(DateTime(timezone=True), nullable=False, default=datetime.datetime.now)
    updated_at = Column(
        DateTime(timezone=True), nullable=False, default=datetime.datetime.now, onupdate=datetime.datetime.now
    )
