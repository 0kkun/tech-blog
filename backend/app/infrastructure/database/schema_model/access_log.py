from sqlalchemy import Column, BigInteger, DateTime, ForeignKey, String, Integer
from datetime import datetime
import datetime

from app.infrastructure.database.database import Base


class AccessLogOrm(Base):
    __tablename__ = "access_logs"

    id = Column(BigInteger, primary_key=True, nullable=False, autoincrement=True)
    visit_url = Column(String(128), nullable=False, comment="アクセスしたページのURL")
    article_id = Column(BigInteger, ForeignKey('articles.id', ondelete="CASCADE"), nullable=True, comment="記事ID") 
    user_agent = Column(String(255), nullable=False, comment="ユーザーエージェント")
    target_year = Column(Integer, nullable=True, comment="対象年")
    target_month = Column(Integer, nullable=True, comment="対象月")
    target_ymd = Column(Integer, nullable=True, comment="対象年月日")
    created_at = Column(DateTime(timezone=True), nullable=False, default=datetime.datetime.now)
    updated_at = Column(
        DateTime(timezone=True), nullable=False, default=datetime.datetime.now, onupdate=datetime.datetime.now
    )

    __table_args__ = (
        {"comment": "アクセス数を管理するテーブル"}
    )
