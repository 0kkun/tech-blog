from sqlalchemy.orm import Session
from app.infrastructure.database.schema_model.user import UserOrm
from app.seeder.base import Seeder


class UsersSeeder(Seeder):
    def run(self, db: Session):
        print("Seeding users ...")
        users = [
            UserOrm(
                name="admin",
                email="admin@example.com",
                password="$2b$12$Ks0mo7p3OEDf1idi9pZYOupuaG5/R7ifBZp36ghynSvbB7HxGcfNa",  # admin
                role=0,
            ),
            UserOrm(
                name="guest",
                email="guest@example.com",
                password="$2b$12$SDUDbXVJfAjGVq7g9ffXTef0xlTAGacd2rgvZfNxlgR.d.2dMwYUi",  # guest
                role=1,
            ),
        ]
        db.add_all(users)
        print("Seeding users ... done")
