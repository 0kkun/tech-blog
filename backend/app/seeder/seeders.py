from sqlalchemy.orm import Session
from app.seeder.base import Seeder
from app.seeder.tags import TagsSeeder
from app.seeder.users import UsersSeeder


class SeederRunner:
    def __init__(self):
        self._seeders: list[Seeder] = [
            TagsSeeder(),
            UsersSeeder(),
        ]

    def run(self, db: Session):
        print("Seeder start")
        for seeder in self._seeders:
            seeder.run(db)
            db.flush()
        print("Seeder end")
