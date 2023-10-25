from fastapi import File, UploadFile, APIRouter, HTTPException
import logging
from util.s3_utils import S3Client
import mimetypes


router = APIRouter()
_logger = logging.getLogger(__name__)

@router.post("/v1/uploads", summary="ファイルをアップロードする", tags=["upload"])
async def file_upload(file: UploadFile = File(None)):
    try:
        validate_mimetype(file)
        dir = "article_images"
        s3_client = S3Client()
        file_url = s3_client.upload_file(file=file, dir=dir)
        return {
            "file_url": file_url
        }
    except HTTPException as e:
        _logger.error(f"Upload failed: {str(e)}")
        raise e
    except Exception as e:
        _logger.error(f"Upload failed: {str(e)}")
        raise HTTPException(status_code=500, detail="ファイルのアップロード中にエラーが発生しました。")

# 許可するMIMEタイプのセット
ALLOWED_MIMETYPES = {"image/png", "image/jpeg", "image/jpg"}

def validate_mimetype(file: UploadFile):
    mime, _ = mimetypes.guess_type(file.filename)
    if mime not in ALLOWED_MIMETYPES:
        raise HTTPException(status_code=422, detail="不正なファイル形式です。許可されているのは 'png', 'jpeg', 'jpg' の画像ファイルのみです。")


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