from sqlalchemy import Column, BigInteger, DateTime, ForeignKey, UniqueConstraint
from datetime import datetime
import datetime

from app.infrastructure.database.database import Base


class ArticleTagOrm(Base):
    __tablename__ = "article_tags"

    id = Column(BigInteger, primary_key=True, nullable=False, autoincrement=True)
    article_id = Column(BigInteger, ForeignKey('articles.id', ondelete="CASCADE"), nullable=False) 
    tag_id = Column(BigInteger, ForeignKey('tags.id', ondelete="CASCADE"), nullable=False) 
    created_at = Column(DateTime(timezone=True), nullable=False, default=datetime.datetime.now)
    updated_at = Column(
        DateTime(timezone=True), nullable=False, default=datetime.datetime.now, onupdate=datetime.datetime.now
    )

    __table_args__ = (
        UniqueConstraint('article_id', 'tag_id', name='uq_article_tag'),
        {"comment": "記事が持つタグを管理するテーブル"}
    )
