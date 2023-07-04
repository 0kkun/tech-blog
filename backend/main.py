from fastapi import FastAPI
from modules.logging import init_logging
from router import init_route
from middleware import init_middleware

init_logging()

app = FastAPI(
    title="Tech Blog",
    version="0.0.1",
)
init_route(app)
init_middleware(app)
