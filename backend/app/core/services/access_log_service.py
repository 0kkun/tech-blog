import calendar
from fastapi import Depends
from sqlalchemy.orm import Session
from typing import List

from app.core.models.access_log import AccessLogPutRequest, FetchDailyTolalAccessLogResponse, AccessLog
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

    def fetch_daily_total(
        self,
        db: Session,
        target_year: int,
        target_month: int,
    ):
        access_logs = self.access_log_repository.fetch_by_target(db, target_year, target_month)

        return self.__make_response(access_logs, int(target_year), int(target_month))

    def __make_response(
        self,
        access_logs: List[AccessLog],
        target_year: int,
        target_month: int,
    ) -> List[FetchDailyTolalAccessLogResponse]:
        last_day = calendar.monthrange(target_year, target_month)[1]

        # access_countの初期値が0で、キーが1ヶ月分の日付になるオブジェクトを生成
        processed_data = {f"{target_year}/{target_month}/{day}": 0 for day in range(1, last_day + 1)}

        for log in access_logs:
            date_str = self.__convert_ymd(log.target_ymd)
            if date_str in processed_data:
                processed_data[date_str] += 1

        return [
            FetchDailyTolalAccessLogResponse(date=date_str, access_count=count)
            for date_str, count in processed_data.items()
        ]

    def __convert_ymd(self, ymd: int) -> str:
        date_str = str(ymd)
        # 年月日に分割して取得
        year = date_str[:4]
        month = date_str[4:6]
        day = date_str[6:8]
        return f"{year}/{month}/{day}"