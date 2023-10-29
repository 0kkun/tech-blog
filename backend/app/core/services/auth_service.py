from passlib.context import CryptContext
import secrets
from datetime import datetime, timedelta
import jwt
from jwt import PyJWTError
from typing import Union
from config.env import Env
from app.core.models.token import Token
from util.datetime_generator import DateTimeGenerator

class AuthService:
    def __init__(self):
        # パスワードのハッシュ化と検証に使用される CryptContext インスタンス
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        self.datetime_generator = DateTimeGenerator()

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """ パスワードを検証します
        Args:
            plain_password (str): 検証する平文のパスワード
            hashed_password (str): ハッシュ化されたパスワード
        Returns:
            bool: パスワードが一致する場合はTrue、それ以外はFalse
        """
        return self.pwd_context.verify(plain_password, hashed_password)


    def convert_hash(self, password: str) -> str:
        """パスワードをハッシュに変換します
        Args:
            password (str): ハッシュに変換するパスワード
        Returns:
            str: ハッシュ化されたパスワード
        """
        return self.pwd_context.hash(password)


    def create_jwt_secret_key(self) -> str:
        """新しいJWT用のシークレットキーを生成します。
        Returns:
            str: 生成されたシークレットキー
        """
        secret_key = secrets.token_urlsafe(32)
        return secret_key


    def create_token(self, data: dict, expires_delta: timedelta = None) -> tuple[str, datetime]:
        """新しいアクセストークンを作成します
        Args:
            data (dict): トークンに含めるデータ
            expires_delta (timedelta, optional): トークンの有効期限。デフォルトはNone
        Returns:
            str: 作成されたアクセストークン
        """
        to_encode = data.copy()
        if expires_delta is not None:
            expire = self.datetime_generator.now_datetime() + expires_delta
        else:
            # デフォルト分数を現在時刻に足す
            expire = self.datetime_generator.now_datetime() + timedelta(minutes=Env.ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, Env.SECRET_KEY, algorithm=Env.ALGORITHM)
        return encoded_jwt, expire


    def decode_access_token(self, token: str) -> Union[str, Token]:
        """アクセストークンをデコードし、その正当性を検証します。
        Args:
            token (str): アクセストークン。
        Returns:
            Union[str, Token]: 有効な場合はデコードされたトークンデータ。
        Raises:
            トークンが無効な場合に発生します。
        """
        try:
            payload = jwt.decode(token, Env.SECRET_KEY, algorithms=[Env.ALGORITHM])
            email: str = payload.get("sub")
            if email is None:
                raise ValueError("Invalid token")
            token_data = Token(email=email)
            return token_data
        except PyJWTError:
            raise ValueError("Invalid token")
