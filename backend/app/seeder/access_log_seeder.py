from sqlalchemy.orm import Session
from app.infrastructure.database.schema_model.access_log import AccessLogOrm
from app.seeder.base import Seeder


class AccessLogsSeeder(Seeder):
    def run(self, db: Session):
        print('Seeding access_logs ...')
        tags = [
            AccessLogOrm(
                visit_url='/',
                user_agent=
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                article_id=None,
                target_year=2023,
                target_month=10,
                target_ymd=20231023,
            ),
            AccessLogOrm(
                visit_url='/',
                user_agent=
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                article_id=None,
                target_year=2023,
                target_month=10,
                target_ymd=20231024,
            ),
            AccessLogOrm(
                visit_url='/',
                user_agent=
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                article_id=None,
                target_year=2023,
                target_month=10,
                target_ymd=20231025,
            ),
            AccessLogOrm(
                visit_url='/',
                user_agent=
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                article_id=None,
                target_year=2023,
                target_month=11,
                target_ymd=20231125,
            ),
            AccessLogOrm(
                visit_url='/article/1',
                user_agent=
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                article_id=1,
                target_year=2023,
                target_month=10,
                target_ymd=20231023,
            ),
            AccessLogOrm(
                visit_url='/article/2',
                user_agent=
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                article_id=2,
                target_year=2023,
                target_month=10,
                target_ymd=20231024,
            ),
            AccessLogOrm(
                visit_url='/article/2',
                user_agent=
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                article_id=2,
                target_year=2023,
                target_month=10,
                target_ymd=20231029,
            ),
            AccessLogOrm(
                visit_url='/article/2',
                user_agent=
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                article_id=2,
                target_year=2023,
                target_month=11,
                target_ymd=20231111,
            ),
        ]
        db.add_all(tags)
        print('Seeding access_logs ... done')
