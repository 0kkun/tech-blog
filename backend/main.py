from fastapi import FastAPI
from config.logging import init_logging
from route import init_route
from config.middleware import init_middleware

init_logging()

app = FastAPI(
    title="Tech Blog",
    version="0.0.1",
)
init_route(app)
init_middleware(app)
