from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.models.access_log import AccessLogPutRequest
from app.core.repositories.access_log_repository import AccessLogRepository
from app.core.repositories.aggregate_access_log_repository import AggregateAccessLogRepository


class AccessLogService:
    def __init__(
        self,
        access_log_repository: AccessLogRepository = Depends(AccessLogRepository),
        agr_access_log_repository: AggregateAccessLogRepository = Depends(AggregateAccessLogRepository),
    ):
        self.access_log_repository = access_log_repository
        self.agr_access_log_repository = agr_access_log_repository

    def create(
        self,
        db: Session,
        request: AccessLogPutRequest,
    ) -> None:
        access_log = self.access_log_repository.create(db, request)
        # ログ追加がある場合は集計テーブルを更新する
        if access_log is not None:
            self.agr_access_log_repository.put(db, request)
