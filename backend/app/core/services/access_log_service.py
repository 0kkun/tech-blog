from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.models.access_log import AccessLogPutRequest
from app.core.repositories.access_log_repository import AccessLogRepository


class AccessLogService:
    def __init__(
        self,
        access_log_repository: AccessLogRepository = Depends(AccessLogRepository),
    ):
        self.access_log_repository = access_log_repository

    def create(
        self,
        db: Session,
        request: AccessLogPutRequest,
    ) -> None:
        self.access_log_repository.create(db, request)
