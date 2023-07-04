from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from env import Env
from sqlalchemy.orm import sessionmaker

DATABASE = "mysql://%s:%s@%s/%s?charset=utf8" % (
    Env.MYSQL_USER_NAME,
    Env.MYSQL_PASSWORD,
    Env.MYSQL_DB_HOST,
    Env.MYSQL_DB_NAME,
)

engine = create_engine(DATABASE, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()