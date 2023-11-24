from sqlalchemy.orm import Session
from app.seeder.base import Seeder
from backend.app.seeder.tags import TagsSeeder


class SeederRunner:
    def __init__(self):
        self._seeders: list[Seeder] = [
            TagsSeeder(),
        ]

    def run(self, db: Session):
        print("Seeder start")
        for seeder in self._seeders:
            seeder.run(db)
            db.flush()
        print("Seeder end")
