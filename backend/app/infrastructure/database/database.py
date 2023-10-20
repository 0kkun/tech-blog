from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.engine import URL
from urllib.parse import quote

from config.env import Env


db_password = quote(Env.MYSQL_PASSWORD)

DATABASE_URL = URL.create(
    drivername="mysql+mysqldb",
    username=Env.MYSQL_USER_NAME,
    password=db_password,
    host=Env.MYSQL_DB_HOST,
    port=Env.MYSQL_HOST_PORT,
    database=Env.MYSQL_DB_NAME
)

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
