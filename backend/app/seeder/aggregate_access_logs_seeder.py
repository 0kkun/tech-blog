from sqlalchemy.orm import Session
from app.infrastructure.database.schema_model.aggregate_access_logs import AggregateAccessLogOrm
from app.seeder.base import Seeder


class AggreagateAccessLogsSeeder(Seeder):
    def run(self, db: Session):
        print('Seeding aggregate_access_logs ...')
        tags = [
            AggregateAccessLogOrm(
                visit_url='/',
                article_id=None,
                target_year=2023,
                target_month=10,
                access_count=3,
            ),
            AggregateAccessLogOrm(
                visit_url='/',
                article_id=None,
                target_year=2023,
                target_month=11,
                access_count=1,
            ),
            AggregateAccessLogOrm(
                visit_url='/article/1',
                article_id=1,
                target_year=2023,
                target_month=10,
                access_count=1,
            ),
            AggregateAccessLogOrm(
                visit_url='/article/2',
                article_id=2,
                target_year=2023,
                target_month=10,
                access_count=2,
            ),
        ]
        db.add_all(tags)
        print('Seeding aggregate_access_logs ... done')