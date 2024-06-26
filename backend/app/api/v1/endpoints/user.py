import logging
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated, List
from util.error_log import get_error_log_info
from app.infrastructure.database.database import SessionLocal
from app.middleware.auth_middleware import verify_token, get_current_user
from app.core.models.user import (
    User,
    UserCreateRequest,
    UserLoginRequest,
    GetUserResponse,
    UpdateUserRequest,
    LoginSuccessReposnse,
)
from app.core.models.success_response import SuccessResponse
from app.core.services.auth_service import AuthService
from app.core.services.user_service import UserService
from config.env import Env

router = APIRouter()
_logger = logging.getLogger(__name__)


# OpenAPIドキュメンテーションに表示させない
@router.get("/v1/users/generate_secret_key", include_in_schema=False)
def generate_secret_key(
    auth_service: Annotated[AuthService, Depends(AuthService)],
):
    secret_key = auth_service.create_jwt_secret_key()
    return {"secret_key": secret_key}


@router.post("/v1/users/register", summary="ユーザー登録", status_code=status.HTTP_201_CREATED, tags=["user"])
def create_user(
    request: UserCreateRequest,
    user_service: Annotated[UserService, Depends(UserService)],
) -> SuccessResponse:
    _logger.info("user register api start")
    try:
        is_authenticated = False
        if request.secret_key:
            if Env.SECRET_KEY != request.secret_key:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
            else:
                is_authenticated = True

        if is_authenticated is False:
            current_user = get_current_user()
            if current_user.is_admin() == False:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
            else:
                is_authenticated = True

        if is_authenticated:
            with SessionLocal.begin() as db:
                user_service.create(db, request)
            return SuccessResponse(message="created")
        else:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    except HTTPException as e:
        message = get_error_log_info(e)
        _logger.exception(message)
        raise HTTPException(status_code=500, detail=f"{message}")


@router.post("/v1/users/login", summary="ログイン", status_code=status.HTTP_200_OK, tags=["user"])
def login(
    request: UserLoginRequest,
    user_service: Annotated[UserService, Depends(UserService)],
) -> LoginSuccessReposnse:
    _logger.info("user login api start")
    try:
        with SessionLocal.begin() as db:
            token = user_service.login(db, request)
        return LoginSuccessReposnse(token=token, token_type="Bearer")
    except HTTPException as e:
        message = get_error_log_info(e)
        _logger.exception(f"{message}")
        raise HTTPException(status_code=e.status_code, detail=f"{e.detail}")


@router.post("/v1/users/logout", summary="ログアウト", status_code=status.HTTP_200_OK, tags=["user"])
def logout(
    user_service: Annotated[UserService, Depends(UserService)],
    current_user: User = Depends(get_current_user),
) -> SuccessResponse:
    try:
        with SessionLocal.begin() as db:
            user_service.logout(db, current_user.id)
        return SuccessResponse(message="logout")
    except HTTPException as e:
        message = get_error_log_info(e)
        _logger.exception(f"{message}")
        raise HTTPException(status_code=e.status_code, detail=f"{e.detail}")


@router.get("/v1/users/me", summary="ログイン中のuserを一件取得", dependencies=[Depends(verify_token)], tags=["user"])
async def me(current_user: User = Depends(get_current_user)) -> GetUserResponse:
    try:
        return GetUserResponse(
            id=current_user.id,
            name=current_user.name,
            email=current_user.email,
            role=current_user.role,
        )
    except HTTPException as e:
        message = get_error_log_info(e)
        _logger.exception(message)
        raise HTTPException(status_code=e.status_code, detail=f"{e.detail}")


@router.get(
    "/v1/users/{user_id}",
    summary="idを指定してuserを一件取得",
    tags=["user"],
    dependencies=[Depends(verify_token)],
)
def show_user(
    user_id: int,
    user_service: Annotated[UserService, Depends(UserService)],
    current_user: User = Depends(get_current_user),
) -> GetUserResponse:
    try:
        if current_user.is_admin() == False:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
        with SessionLocal.begin() as db:
            user = user_service.get(db, user_id)
        return GetUserResponse(id=user.id, name=user.name, email=user.email, role=user.role)
    except HTTPException as e:
        message = get_error_log_info(e)
        _logger.exception(message)
        raise HTTPException(status_code=e.status_code, detail=f"{e.detail}")


@router.get("/v1/users", summary="user一覧取得", dependencies=[Depends(verify_token)], tags=["user"])
async def fetch_users(
    user_service: Annotated[UserService, Depends(UserService)],
) -> List[GetUserResponse]:
    _logger.info("users fetch api start")
    try:
        with SessionLocal.begin() as db:
            users = user_service.fetch(db)
        return users
    except HTTPException as e:
        message = get_error_log_info(e)
        _logger.exception(message)
        raise HTTPException(status_code=e.status_code, detail=f"{e.detail}")


@router.put("/v1/users", summary="user更新", dependencies=[Depends(verify_token)], tags=["user"])
async def update_user(
    request: UpdateUserRequest,
    user_service: Annotated[UserService, Depends(UserService)],
    current_user: User = Depends(get_current_user),
) -> SuccessResponse:
    _logger.info("users put api start")
    try:
        if current_user.is_admin() == False:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
        with SessionLocal.begin() as db:
            user_service.update(db, request)
        return SuccessResponse(message="updated")
    except HTTPException as e:
        message = get_error_log_info(e)
        _logger.exception(message)
        raise HTTPException(status_code=e.status_code, detail=f"{e.detail}")


@router.delete("/v1/users/{user_id}", summary="ユーザーを1件削除", dependencies=[Depends(verify_token)], tags=["user"])
async def delete_user(
    user_id: int,
    user_service: Annotated[UserService, Depends(UserService)],
    current_user: User = Depends(get_current_user),
) -> SuccessResponse:
    _logger.info("user delete api start")
    try:
        if current_user.is_admin() == False:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
        with SessionLocal.begin() as db:
            user_service.delete(db, user_id)
        return SuccessResponse(message="deleted")
    except HTTPException as e:
        _logger.exception(str(e))
        message = get_error_log_info(e)
        raise HTTPException(status_code=500, detail=f"{message}")
