from fastapi import FastAPI
from config.logging import init_logging
from config.middleware import init_middleware
from route import init_route

init_logging()

app = FastAPI(
    title="Tech Blog",
    version="0.0.1",
)
init_route(app)
init_middleware(app)
