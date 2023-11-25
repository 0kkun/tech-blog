from sqlalchemy.orm import Session
from app.infrastructure.database.schema_model.tag import TagOrm
from app.seeder.base import Seeder


class TagsSeeder(Seeder):
    def run(self, db: Session):
        print('Seeding tags ...')
        tags = [
            TagOrm(name='Laravel'),
            TagOrm(name='React'),
            TagOrm(name='PHP'),
            TagOrm(name='Typescript'),
            TagOrm(name='AWS'),
            TagOrm(name='Python'),
            TagOrm(name='FastAPI'),
        ]
        db.add_all(tags)
        print('Seeding tags ... done')
