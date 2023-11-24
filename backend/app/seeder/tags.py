from sqlalchemy.orm import Session
from app.infrastructure.database.schema_model.tag import TagOrm
from app.seeder.base import Seeder


class TagsSeeder(Seeder):
    def run(self, db: Session):
        print('Seeding tags ...')
        db.add(TagOrm(
            name="Larave",
        ))
        print('Seeding tags ... done')