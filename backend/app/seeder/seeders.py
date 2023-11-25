from sqlalchemy.orm import Session
from app.seeder.base import Seeder
from app.seeder.tags import TagsSeeder
from app.seeder.users import UsersSeeder
from app.seeder.articles_seeder import ArticlesSeeder


class SeederRunner:
    def __init__(self):
        self._seeders: list[Seeder] = [
            TagsSeeder(),
            UsersSeeder(),
            ArticlesSeeder(),
        ]
        
    # リレーションを一時的に無効化
    def __disable_relationships(self, target, connection, **kw):
        for relationship in target.relationships:
            setattr(target, relationship.key, None)


    def run(self, db: Session):
        print("Seeder start")
        for seeder in self._seeders:
            seeder.run(db)
            db.flush()
        print("Seeder end")
