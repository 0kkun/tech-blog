import os


def _getenv(key: str, default: str = ""):
    env = os.environ.get(key)
    if env is None:
        return default
    return env


class Env:
    # server
    APP_ENV = _getenv("APP_ENV", "local")
    LOG_LEVEL = _getenv("LOG_LEVEL", "debug")
    APP_URL = _getenv("APP_URL")

    # db
    MYSQL_DB_HOST = _getenv("MYSQL_DB_HOST")
    MYSQL_DB_NAME = _getenv("MYSQL_DB_NAME")
    MYSQL_HOST_PORT = _getenv("MYSQL_HOST_PORT")
    MYSQL_USER_NAME = _getenv("MYSQL_USER_NAME")
    MYSQL_PASSWORD = _getenv("MYSQL_PASSWORD")
    MYSQL_ROOT_PASSWORD = _getenv("MYSQL_ROOT_PASSWORD")

    # front
    FRRONT_URL = _getenv("FRRONT_URL")

    # s3
    FILESYSTEM_DISK = _getenv("FILESYSTEM_DISK")
    AWS_ACCESS_KEY_ID = _getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = _getenv("AWS_SECRET_ACCESS_KEY")
    AWS_DEFAULT_REGION = _getenv("AWS_DEFAULT_REGION")
    AWS_BUCKET = _getenv("AWS_BUCKET")
    AWS_USE_PATH_STYLE_ENDPOINT = _getenv("AWS_USE_PATH_STYLE_ENDPOINT")
    AWS_ENDPOINT = _getenv("AWS_ENDPOINT")
    AWS_URL = _getenv("AWS_URL")


