import logging
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated, Optional, List
from app.core.models.user import User, UserCreateRequest, UserLoginRequest, GetUserResponse
from app.core.models.success_response import SuccessResponse
from app.core.services.tag_service import TagService
from app.infrastructure.database.database import SessionLocal
from util.error_log import get_error_log_info
from app.core.services.auth_service import AuthService
from app.core.services.user_service import UserService
from app.middleware.auth_middleware import verify_token

router = APIRouter()
_logger = logging.getLogger(__name__)


# OpenAPIドキュメンテーションに表示させない
@router.get('/v1/users/generate_secret_key', include_in_schema=False)
def generate_secret_key(
    auth_service: Annotated[AuthService, Depends(AuthService)],
):
    secret_key = auth_service.create_jwt_secret_key()
    return {'secret_key': secret_key}


@router.post('/v1/users/register', status_code=status.HTTP_201_CREATED, tags=['user'])
def create_user(
    request: UserCreateRequest,
    user_service: Annotated[UserService, Depends(UserService)],
) -> SuccessResponse:
    _logger.info('user register api start')
    try:
        with SessionLocal.begin() as db:
            user_service.create(db, request)
        return SuccessResponse(message='created')
    except HTTPException as e:
        message = get_error_log_info(e)
        _logger.exception(message)
        raise HTTPException(status_code=500, detail=f'{message}')


@router.post('/v1/users/login', status_code=status.HTTP_200_OK, tags=['user'])
def login(
    request: UserLoginRequest,
    user_service: Annotated[UserService, Depends(UserService)],
):
    _logger.info('user login api start')
    try:
        with SessionLocal.begin() as db:
            token = user_service.login(db, request)
        return {"token": token, "token_type": "Bearer"}

    except HTTPException as e:
        message = get_error_log_info(e)
        _logger.exception(f"{message}")
        raise HTTPException(status_code=e.status_code, detail=f'{e.detail}')


@router.get("/v1/users/{user_id}", dependencies=[Depends(verify_token)])
def show_user(
    user_id: int,
    user_service: Annotated[UserService, Depends(UserService)],
) -> GetUserResponse:
    try:
        with SessionLocal.begin() as db:
            user = user_service.get(db, user_id)
        return GetUserResponse(id=user.id, name=user.name, email=user.email)
    except HTTPException as e:
        message = get_error_log_info(e)
        _logger.exception(message)
        raise HTTPException(status_code=e.status_code, detail=f'{e.detail}')


# @router.get('/v1/users', summary='タグ一覧取得', tags=['user'])
# async def fetch_tag(
#     tag_service: Annotated[TagService, Depends(TagService)],
# ):
#     _logger.info('tag fetch api start')
#     try:
#         with SessionLocal.begin() as db:
#             tags = tag_service.fetch(db)
#         return tags

#     except HTTPException as e:
#         _logger.exception(str(e))
#         message = get_error_log_info(e)
#         raise HTTPException(status_code=500, detail=f'{message}')
