from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from urllib.parse import quote
from config.env import Env

db_password = quote(Env.MYSQL_PASSWORD)

DATABASE_URL = "mysql+mysqldb://%s:%s@%s:%s/%s?charset=utf8" % (
    Env.MYSQL_USER_NAME,
    db_password,
    Env.MYSQL_DB_HOST,
    Env.MYSQL_HOST_PORT,
    Env.MYSQL_DB_NAME,
)

# NOTE: pool_recycle
# https://blog.amedama.jp/entry/2015/08/15/133322
engine = create_engine(
    DATABASE_URL,
    echo=False,
    # pool_recycle=60,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
