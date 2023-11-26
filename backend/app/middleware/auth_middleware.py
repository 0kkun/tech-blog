import jwt
from jwt import PyJWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from config.env import Env
from util.datetime_generator import DateTimeGenerator
from app.core.repositories.user_repository import UserRepository
from app.infrastructure.database.database import SessionLocal
from app.infrastructure.database.database import get_db
from app.infrastructure.database.schema_model.token import TokenOrm


async def verify_token(
        credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
        db: Session = Depends(get_db),
):
    """リクエストヘッダーからアクセストークンを検証します。
    Args:
    - credentials (HTTPAuthorizationCredentials): リクエストヘッダーから抽出された認証情報。
    - db (Session): データベースセッション。
    Exceptions:
    - HTTPException: 認証スキームが無効であるか、トークンが無効な場合に発生します。
    Returns:
    - TokenData: トークンが有効な場合のトークンデータ。
    """
    if credentials.scheme != "Bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication scheme",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = credentials.credentials
    # トークンのバリデーションを実行する
    token_data = validate_token(token, db)

    # トークンが正しくない場合
    if token_data is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return token_data


def validate_token(token: str, db: Session) -> bool:
    """トークンの有効性を検証します。
    Args:
        token (str): 検証するアクセストークン
        db (Session): SQLAlchemy セッションオブジェクト
    Returns:
        bool: トークンが有効であれば True、それ以外は False
    """
    datetime_generator = DateTimeGenerator()
    current_time = datetime_generator.now_datetime()
    # TODO: リポジトリにロジック移設する
    token_data = db.query(TokenOrm).filter(TokenOrm.token == token, TokenOrm.expired_at
                                            > current_time).first()
    return token_data


# OAuth2 パスワードベアラートークンの認証スキームを設定
# このスキームはアクセストークンをリクエストのヘッダーから取得するために使用
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=Env.APP_URL)


async def get_current_user(token: str = Depends(oauth2_scheme)):
    """現在ログイン中のユーザーを取得します
    Args:
        token (str, optional): _description_. Defaults to Depends(oauth2_scheme).
    Raises:
        credentials_exception: 認証情報の検証に失敗した場合に発生する例外
    Returns:
        User: 現在のユーザー
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    user_repository = UserRepository()
    try:
        payload = jwt.decode(token, Env.SECRET_KEY, algorithms=[Env.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except PyJWTError:
        raise credentials_exception
    with SessionLocal.begin() as db:
        user = user_repository.getByEmail(db, email)
    if user is None:
        raise credentials_exception
    return user
