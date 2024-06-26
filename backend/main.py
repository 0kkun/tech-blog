from fastapi import FastAPI
from app.middleware.middleware import init_middleware
from route import init_route

app = FastAPI(
    title="Tech Blog",
    version="0.0.1",
)

init_middleware(app)
init_route(app)
