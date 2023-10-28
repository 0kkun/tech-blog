from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.infrastructure.database.database import get_db
from app.infrastructure.database.schema_model.token import TokenOrm
from sqlalchemy.orm import Session
from util.datetime_generator import DateTimeGenerator


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
    token_data = db.query(TokenOrm).filter(TokenOrm.token == token, TokenOrm.expired_at > current_time).first()
    # db.query(Token).filter(Token.token == token, Token.expired_at > datetime.utcnow()).first()
    return token_data
