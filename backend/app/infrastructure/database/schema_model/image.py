from sqlalchemy import Column, String, BigInteger, DateTime
import datetime


from app.infrastructure.database.database import Base


class ImageOrm(Base):
    __tablename__ = "images"
    __table_args__ = {"comment": "画像パス保管テーブル"}

    id = Column(BigInteger, primary_key=True, nullable=False, autoincrement=True)
    url = Column(String(255), nullable=False, comment="画像のURL")
    created_at = Column(DateTime(timezone=True), nullable=False, default=datetime.datetime.now)
    updated_at = Column(
        DateTime(timezone=True), nullable=False, default=datetime.datetime.now, onupdate=datetime.datetime.now
    )