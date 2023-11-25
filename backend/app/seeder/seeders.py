from sqlalchemy.orm import Session
from app.seeder.base import Seeder
from app.seeder.tags import TagsSeeder
from app.seeder.users import UsersSeeder
from app.seeder.articles_seeder import ArticlesSeeder
from app.seeder.article_tags_seeder import ArticleTagsSeeder
from app.seeder.access_log_seeder import AccessLogsSeeder
from app.seeder.aggregate_access_logs_seeder import AggreagateAccessLogsSeeder


class SeederRunner:
    def __init__(self):
        self._seeders: list[Seeder] = [
            TagsSeeder(),
            UsersSeeder(),
            ArticlesSeeder(),
            ArticleTagsSeeder(),
            AccessLogsSeeder(),
            AggreagateAccessLogsSeeder(),
        ]

    def run(self, db: Session):
        print("Seeder start")
        for seeder in self._seeders:
            seeder.run(db)
            db.flush()
        print("Seeder end")
