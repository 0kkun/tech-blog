import os


def _getenv(key: str, default: str = ""):
    env = os.environ.get(key)
    if env is None:
        return default
    return env


class Env:
    APP_ENV = _getenv("APP_ENV", "local")
    LOG_LEVEL = _getenv("LOG_LEVEL", "debug")
    APP_URL = _getenv("APP_URL")
    MYSQL_DB_HOST = _getenv("MYSQL_DB_HOST")
    MYSQL_DB_NAME = _getenv("MYSQL_DB_NAME")
    MYSQL_HOST_PORT = _getenv("MYSQL_HOST_PORT")
    MYSQL_USER_NAME = _getenv("MYSQL_USER_NAME")
    MYSQL_PASSWORD = _getenv("MYSQL_PASSWORD")
    MYSQL_ROOT_PASSWORD = _getenv("MYSQL_ROOT_PASSWORD")
    FRRONT_URL = _getenv("FRRONT_URL")
