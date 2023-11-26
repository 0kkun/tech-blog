from fastapi import FastAPI
from app.api.v1.endpoints import ping, article, tag, upload, user, access_log


def init_route(app: FastAPI) -> None:
    app.include_router(ping.router)
    app.include_router(article.router)
    app.include_router(tag.router)
    app.include_router(upload.router)
    app.include_router(user.router)
    app.include_router(access_log.router)
