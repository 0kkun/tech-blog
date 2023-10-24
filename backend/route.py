from fastapi import FastAPI
from app.api.v1.endpoints import ping, article, tag, upload


def init_route(app: FastAPI) -> None:
    app.include_router(ping.router)
    app.include_router(article.router)
    app.include_router(tag.router)
    app.include_router(upload.router)