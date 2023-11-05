from sqlalchemy import Column, String, BigInteger, DateTime, Boolean, Text, Integer
from sqlalchemy.orm import relationship
import datetime

from app.infrastructure.database.database import Base


class ArticleOrm(Base):
    __tablename__ = "articles"
    __table_args__ = {"comment": "記事テーブル"}

    id = Column(BigInteger, primary_key=True, nullable=False, autoincrement=True)
    title = Column(String(128), nullable=False, comment="記事タイトル")
    content = Column(Text(), nullable=False, comment="記事内容")
    target_year = Column(Integer, nullable=True, comment="対象年")
    target_month = Column(Integer, nullable=True, comment="対象月")
    is_published = Column(Boolean, nullable=False, comment="投稿済みかどうか")
    created_at = Column(DateTime(timezone=True), nullable=False, default=datetime.datetime.now)
    updated_at = Column(
        DateTime(timezone=True), nullable=False, default=datetime.datetime.now, onupdate=datetime.datetime.now
    )

    # Articleが持つタグを取得。リレーション (1:多)
    tags = relationship("TagOrm", secondary="article_tags")

    # Articleが持つサムネイル画像を取得。リレーション (1:1)
    thumnail_image = relationship("ImageOrm", secondary="article_thumbnail_images", uselist=False)