from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from env import Env


def setup_cors(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            # 許可するオリジンをここに追加する
            Env.APP_URL,
        ],
        allow_methods=["*"],
        allow_headers=["*"],
        allow_credentials=True,
    )


def init_middleware(app: FastAPI):
    setup_cors(app)