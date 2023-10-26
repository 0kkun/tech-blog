import logging
import mimetypes
from fastapi import File, UploadFile, APIRouter, HTTPException, Depends
from typing import Annotated, Optional, List
from util.s3_utils import S3Client
from app.core.services.image_service import ImageService
from app.infrastructure.database.database import SessionLocal
from app.core.models.image import ImagePostResponse

router = APIRouter()
_logger = logging.getLogger(__name__)


# 許可するMIMEタイプのセット
ALLOWED_MIMETYPES = {"image/png", "image/jpeg", "image/jpg"}

def validate_mimetype(file: UploadFile):
    mime, _ = mimetypes.guess_type(file.filename)
    if mime not in ALLOWED_MIMETYPES:
        raise HTTPException(status_code=422, detail="不正なファイル形式です。許可されているのは 'png', 'jpeg', 'jpg' の画像ファイルのみです。")


@router.post("/v1/uploads", summary="ファイルをアップロードする", tags=["upload"])
async def file_upload(
    image_service: Annotated[ImageService, Depends(ImageService)],
    file: UploadFile = File(None),
):
    try:
        validate_mimetype(file)
        dir = "article_images"
        s3_client = S3Client()
        file_url = s3_client.upload_file(file=file, dir=dir)

        with SessionLocal.begin() as db:
            image = image_service.create(db, file_url)

        return ImagePostResponse(id=image.id, url=image.url)

    except HTTPException as e:
        _logger.error(f"Upload failed: {str(e)}")
        raise e
    except Exception as e:
        _logger.error(f"Upload failed: {str(e)}")
        raise HTTPException(status_code=500, detail="ファイルのアップロード中にエラーが発生しました。")



@router.delete("/v1/uploads/all_file", summary="ファイルを全件数削除する", tags=["upload"])
async def file_delete():
    try:
        dir = "article_images"
        s3_client = S3Client()
        s3_client.delete_all_files_in_directory(dir=dir)
        return {
            "message": "success"
        }
    except Exception as e:
        _logger.error(f"Deletion failed: {str(e)}")