from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core.models.access_log import AccessLogPutRequest, AccessLog
from app.infrastructure.database.schema_model.access_log import AccessLogOrm
from util.datetime_generator import DateTimeGenerator


class AccessLogRepository:
    def create(
        self,
        db: Session,
        request: AccessLogPutRequest,
    ):
        """
            アクセスログレコードを生成する
        """
        datetime = DateTimeGenerator()
        now = datetime.now_datetime()
        target_ymd = now.strftime("%Y%m%d")
        access_log = db.scalars(
            select(AccessLogOrm)
            .where(AccessLogOrm.user_agent == request.user_agent)
            .where(AccessLogOrm.visit_url == request.visit_url)
            .where(AccessLogOrm.target_ymd == target_ymd)
        ).one_or_none()
        
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
