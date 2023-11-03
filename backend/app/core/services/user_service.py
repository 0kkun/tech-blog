from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.repositories.user_repository import UserRepository
from app.core.repositories.token_repository import TokenRepository
from typing import List
from app.core.models.user import UserCreateRequest
from app.core.models.token import PutTokenRequest
from app.core.services.auth_service import AuthService
from app.core.models.user import UserLoginRequest

class UserService:
    def __init__(
        self,
        user_repository: UserRepository = Depends(UserRepository),
        token_repository: TokenRepository = Depends(TokenRepository),
        auth_service: AuthService = Depends(AuthService),
    ):
        self.user_repository = user_repository
        self.token_repository = token_repository
        self.auth_service = auth_service

    def create(
        self,
        db: Session,
        request: UserCreateRequest,
    ):
        user = self.user_repository.getByEmail(db, request.email)
        if user:
            raise HTTPException(status_code=400, detail="Email already exists")
        # パスワードをハッシュ化
        hashed_password = self.auth_service.convert_hash(request.password)
        self.user_repository.create(db, request.name, request.email, request.role ,hashed_password)

    def login(
        self,
        db: Session,
        request: UserLoginRequest,
    ) -> str:
        db_user = self.user_repository.getByEmail(db, request.email)
        if db_user is None or not self.auth_service.verify_password(request.password, db_user.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        token, expired_at = self.auth_service.create_token(data={"sub": db_user.email})
        self.token_repository.put(db, PutTokenRequest(token=token, user_id=db_user.id, expired_at=expired_at))
        return token

    def get(
        self,
        db: Session,
        user_id: int,
    ):
        user = self.user_repository.getById(db, user_id)
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return user


    def fetch(
        self,
        db: Session,
    ):
        users = self.user_repository.fetch(db)
        if users is None:
            raise HTTPException(status_code=404, detail="User not found")
        return users
