from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import Optional, List
from app.core.models.access_log import AccessLogPutRequest, AccessLog
from app.infrastructure.database.schema_model.access_log import AccessLogOrm
from util.datetime_generator import DateTimeGenerator


class AccessLogRepository:
    def create(
        self,
        db: Session,
        request: AccessLogPutRequest,
    ) -> Optional[AccessLog]:
        """
            アクセスログレコードを生成する
        """
        datetime = DateTimeGenerator()
        now = datetime.now_datetime()
        target_ymd = now.strftime("%Y%m%d")
        # 同一ユーザーがアクセスしたページの本日のアクセスログを取得する
        # yapf: disable
        access_log = db.scalars(
            select(AccessLogOrm)
            .where(AccessLogOrm.user_agent == request.user_agent)
            .where(AccessLogOrm.visit_url == request.visit_url)
            .where(AccessLogOrm.target_ymd == target_ymd)
        ).one_or_none()
        # yapf: enable

        # 同ユーザー・同日・同ページの場合はカウントしない
        if access_log is not None:
            return None

        # 新規作成
        new_access_log = AccessLogOrm(
            user_agent = request.user_agent,
            visit_url = request.visit_url,
            article_id = request.article_id,
            target_year = now.year,
            target_month = now.month,
            target_ymd = target_ymd,
            created_at = now,
            updated_at = now,
        )
        db.add(new_access_log)
        db.flush()
        return AccessLog.from_orm(new_access_log)


    def fetch_by_target(
        self,
        db: Session,
        target_year: int,
        target_month: int,
    ) -> Optional[List[AccessLog]]:
        # yapf: disable
        access_logs = db.scalars(
            select(AccessLogOrm)
            .where(AccessLogOrm.target_year == target_year)
            .where(AccessLogOrm.target_month == target_month)
        ).all()
        # yapf: enable
        if access_logs is None:
            return None
        return [AccessLog.from_orm(log) for log in access_logs]
