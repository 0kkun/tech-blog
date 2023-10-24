from datetime import datetime
from zoneinfo import ZoneInfo


class DateTimeGenerator():
    def now(self):
        return datetime.now(ZoneInfo("Asia/Tokyo")).strftime("%Y-%m-%dT%H:%M:%S")

    def datetime(self):
        return datetime.now(ZoneInfo("Asia/Tokyo"))

    def datetime_string(self):
        now = datetime.now(ZoneInfo("Asia/Tokyo"))
        return now.strftime("%Y_%m_%d_%H%M")