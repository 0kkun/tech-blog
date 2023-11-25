from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core.models.access_log import AccessLogPutRequest
from app.infrastructure.database.schema_model.aggregate_access_logs import AggregateAccessLogOrm
from util.datetime_generator import DateTimeGenerator


class AggregateAccessLogRepository:
    def put(
        self,
        db: Session,
        request: AccessLogPutRequest,
    ) -> None:
        """
            アクセスログ合計レコードを生成する
        """
        datetime = DateTimeGenerator()
        now = datetime.now_datetime()
        agr_access_log = db.scalars(
            select(AggregateAccessLogOrm)
            .where(AggregateAccessLogOrm.visit_url == request.visit_url)
            .where(AggregateAccessLogOrm.target_year == now.year)
            .where(AggregateAccessLogOrm.target_month == now.month)
        ).one_or_none()

        if agr_access_log is None:
            # 新規作成
            new_agr_access_log = AggregateAccessLogOrm(
                visit_url = request.visit_url,
                article_id = request.article_id,
                access_count = 1,
                target_year = now.year,
                target_month = now.month,
                created_at = now,
                updated_at = now,
            )
            db.add(new_agr_access_log)
            db.flush()
        else:
            # カウントを増やしてアップデート処理
            agr_access_log.access_count += 1
            agr_access_log.updated_at = now
            db.add(agr_access_log)
            db.flush()
