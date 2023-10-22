from sqlalchemy import Column, String, BigInteger, DateTime
from datetime import datetime
import datetime

from app.infrastructure.database.database import Base


class TagOrm(Base):
    __tablename__ = "tags"
    __table_args__ = {"comment": "タグ管理テーブル"}

    id = Column(BigInteger, primary_key=True, nullable=False, autoincrement=True)
    name = Column(String(128), nullable=False, comment="タグ名")
    created_at = Column(DateTime(timezone=True), nullable=False, default=datetime.datetime.now)
    updated_at = Column(
        DateTime(timezone=True), nullable=False, default=datetime.datetime.now, onupdate=datetime.datetime.now
    )