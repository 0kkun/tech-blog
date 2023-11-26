from app.infrastructure.database.database import SessionLocal
from app.seeder.seeders import SeederRunner


def main():
    db = SessionLocal()
    try:
        with db.begin():
            SeederRunner().run(db)
    finally:
        db.close()


if __name__ == "__main__":
    main()
