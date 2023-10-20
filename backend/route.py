from fastapi import FastAPI
from app.api.v1.endpoints import ping, article


def init_route(app: FastAPI) -> None:
    app.include_router(ping.router)
    app.include_router(article.router)