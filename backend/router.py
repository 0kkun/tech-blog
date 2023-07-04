from fastapi import FastAPI
from apis.endpoints import ping


def init_route(app: FastAPI) -> None:
    app.include_router(ping.router)