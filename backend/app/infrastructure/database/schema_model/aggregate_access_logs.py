from sqlalchemy import Column, BigInteger, DateTime, ForeignKey, String, Integer, UniqueConstraint
from datetime import datetime
import datetime

from app.infrastructure.database.database import Base


class AggregateAccessLogOrm(Base):
    __tablename__ = "aggregate_access_logs"

    id = Column(BigInteger, primary_key=True, nullable=False, autoincrement=True)
    visit_url = Column(String(128), nullable=False, comment="アクセスしたページのURL")
    article_id = Column(BigInteger, ForeignKey('articles.id', ondelete="CASCADE"), nullable=True, comment="記事ID")
    access_count = Column(Integer, nullable=False, comment="アクセス数")
    target_year = Column(Integer, nullable=True, comment="対象年")
    target_month = Column(Integer, nullable=True, comment="対象月")
    created_at = Column(DateTime(timezone=True), nullable=False, default=datetime.datetime.now)
    updated_at = Column(
        DateTime(timezone=True), nullable=False, default=datetime.datetime.now, onupdate=datetime.datetime.now
    )

    __table_args__ = (
        UniqueConstraint('target_year', 'target_month', 'visit_url', name='uq_target_year_month_url'),
        {"comment": "月毎・ページ毎のアクセス数の合計を管理するテーブル"}
    )
