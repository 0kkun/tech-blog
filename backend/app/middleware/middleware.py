from fastapi import FastAPI
from app.middleware.logging import setup_logging
from app.middleware.cors import setup_cors


def init_middleware(app: FastAPI):
    setup_logging()
    setup_cors(app)