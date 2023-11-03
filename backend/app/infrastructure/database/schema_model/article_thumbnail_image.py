from sqlalchemy import Column, BigInteger, DateTime, ForeignKey, UniqueConstraint
from datetime import datetime
import datetime

from app.infrastructure.database.database import Base


class ArticleThumbnailImageOrm(Base):
    __tablename__ = "article_thumbnail_images"

    id = Column(BigInteger, primary_key=True, nullable=False, autoincrement=True)
    article_id = Column(BigInteger, ForeignKey('articles.id', ondelete="CASCADE"), nullable=False, comment="記事ID") 
    image_id = Column(BigInteger, ForeignKey('images.id', ondelete="CASCADE"), nullable=False, comment="画像ID") 
    created_at = Column(DateTime(timezone=True), nullable=False, default=datetime.datetime.now)
    updated_at = Column(
        DateTime(timezone=True), nullable=False, default=datetime.datetime.now, onupdate=datetime.datetime.now
    )

    __table_args__ = (
        UniqueConstraint('article_id', 'image_id', name='uq_article_image'),
        {"comment": "記事がサムネイル画像を管理するテーブル"}
    )
