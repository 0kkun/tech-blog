from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import Optional, List
from app.core.models.user import UserCreateRequest, User, GetUserResponse, UpdateUserRequest
from app.infrastructure.database.schema_model.user import UserOrm
from util.datetime_generator import DateTimeGenerator


class UserRepository:
    def getByEmail(
        self,
        db: Session,
        email: str,
    ) -> Optional[User]:
        """
            emailを指定してuserを1件取得する
        """
        user = db.query(UserOrm).filter(UserOrm.email == email, ).one_or_none()

        if user is None:
            return None
        return User.from_orm(user)

    def getById(
        self,
        db: Session,
        user_id: int,
    ) -> Optional[User]:
        """
            idを指定してuserを1件取得する
        """
        user = db.query(UserOrm).filter(UserOrm.id == user_id, ).one_or_none()

        if user is None:
            return None
        return User.from_orm(user)

    def create(
        self,
        db: Session,
        name: str,
        email: str,
        role: int,
        hashed_password: str,
    ) -> None:
        """
            userを生成する
        """
        datetime = DateTimeGenerator()
        now = datetime.now_datetime()

        new_user = UserOrm(
            name=name,
            email=email,
            password=hashed_password,
            role=role,
            created_at=now,
            updated_at=now,
        )
        db.add(new_user)
        db.flush()

    def fetch(
        self,
        db: Session,
    ) -> Optional[List[GetUserResponse]]:
        """
            ユーザー一覧取得
        """
        users = db.query(UserOrm.id, UserOrm.name, UserOrm.email, UserOrm.role).all()
        user_list = [GetUserResponse.from_orm(user) for user in users]
        return user_list

    def update(
        self,
        db: Session,
        request: UpdateUserRequest,
    ):
        """
            ユーザー更新
        """
        datetime = DateTimeGenerator()
        now = datetime.now_datetime()
        update_user = db.query(UserOrm).filter(UserOrm.id == request.id).first()
        update_user.name = request.name
        update_user.email = request.email
        update_user.password = request.password
        update_user.role = request.role
        update_user.updated_at = now
        db.add(update_user)
        db.flush()

    def delete(
        self,
        db: Session,
        user_id: int,
    ) -> None:
        """
            記事1件削除
        """
        user = db.query(UserOrm).filter(UserOrm.id == user_id, ).one_or_none()
        if user is None:
            raise ValueError('User does not exist')
        db.delete(user)
