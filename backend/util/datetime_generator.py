from datetime import datetime
from zoneinfo import ZoneInfo


class DateTimeGenerator():
    def now():
        return datetime.now(ZoneInfo("Asia/Tokyo")).strftime("%Y-%m-%dT%H:%M:%S")

    def datetime():
        return datetime.now(ZoneInfo("Asia/Tokyo"))