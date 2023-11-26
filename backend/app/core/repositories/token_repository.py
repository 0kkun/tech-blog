from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import Optional, List
from app.core.models.token import Token, PutTokenRequest
from app.infrastructure.database.schema_model.token import TokenOrm
from util.datetime_generator import DateTimeGenerator


class TokenRepository:
    def get(
        self,
        db: Session,
        user_id: str,
    ) -> Optional[Token]:
        """
            emailを指定してuserを1件取得する
        """
        token = db.query(TokenOrm).filter(TokenOrm.user_id == user_id, ).one_or_none()

        if token is None:
            return None
        return Token.from_orm(token)

    def put(
        self,
        db: Session,
        request: PutTokenRequest,
    ) -> Token:
        datetime = DateTimeGenerator()
        now = datetime.now_datetime()

        db_token = db.query(TokenOrm).filter(TokenOrm.user_id == request.user_id).first()

        if db_token is None:
            new_token = TokenOrm(
                token=request.token,
                user_id=request.user_id,
                expired_at=request.expired_at,
                last_login_at=now,
            )
            db.add(new_token)
            db.flush()
            return Token.from_orm(new_token)
        else:
            db_token.token = request.token
            db_token.expired_at = request.expired_at
            db_token.last_login_at = now
            db.add(db_token)
            db.flush()
            return Token.from_orm(db_token)

    def delete(
        self,
        db: Session,
        user_id: int,
    ):
        token = db.query(TokenOrm).filter(TokenOrm.user_id == user_id).first()
        db.delete(token)
