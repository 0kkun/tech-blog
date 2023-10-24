from fastapi import File, UploadFile, APIRouter
import logging
from util.s3_utils import S3Client
import mimetypes


router = APIRouter()
_logger = logging.getLogger(__name__)

@router.post("/v1/uploads", summary="ファイルをアップロードする", tags=["upload"])
async def file_upload(file: UploadFile = File(None)):
    try:
        dir = "article_images"
        s3_client = S3Client()
        file_url = s3_client.upload_file(file=file, dir=dir)
        return {
            "file_url": file_url
        }
    except Exception as e:
        _logger.error(f"Upload failed: {str(e)}")


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