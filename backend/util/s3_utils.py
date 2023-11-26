import boto3
import mimetypes
import os
from config.env import Env
from fastapi import UploadFile
from util.datetime_generator import DateTimeGenerator


class S3Client:
    def __init__(self):
        self.s3_client = boto3.client('s3',
                                        endpoint_url=Env.AWS_ENDPOINT,
                                        aws_access_key_id=Env.AWS_ACCESS_KEY_ID,
                                        aws_secret_access_key=Env.AWS_SECRET_ACCESS_KEY,
                                        region_name=Env.AWS_DEFAULT_REGION)
        self.bucket_name = Env.AWS_BUCKET
        self.datetime_generator = DateTimeGenerator()

    def search_file(self, prefix: str):
        try:
            contents = self.s3_client.list_objects(Bucket=self.bucket_name,
                                                    Prefix=prefix).get("Contents")
            return contents
        except Exception as e:
            print(f"Search failed: {str(e)}")

    def get_file(self, file_name: str):
        try:
            file = self.s3_client.get_object(Bucket=self.bucket_name,
                                                Key=file_name)["Body"].read().decode('utf-8')
            return file
        except Exception as e:
            print(f"Get failed: {str(e)}")

    def upload_file(self, file: UploadFile, dir: str = None, file_name: str = None):
        # ファイルのMIMEタイプを取得
        mime_type = mimetypes.guess_type(file.filename)
        extension = os.path.splitext(file.filename)[1]

        if file_name is None:
            file_name = self.datetime_generator.datetime_string() + extension

        if dir is None:
            path = f"{file_name}"
        else:
            path = f"{dir}/{file_name}"

        self.s3_client.put_object(
            Body=file.file,
            Bucket=self.bucket_name,
            Key=path,
        )
        # S3にアップロードしたオブジェクトのパス
        file_url = f"{Env.AWS_URL}/{self.bucket_name}/{dir}/{file_name}"
        return file_url

    def delete_file(self, s3_key):
        self.s3.delete_object(Bucket=self.bucket_name, Key=s3_key)

    def delete_all_files_in_directory(self, dir: str):
        # 削除するディレクトリ内のすべてのオブジェクトをリストアップ
        objects = self.s3_client.list_objects(Bucket=self.bucket_name, Prefix=dir).get("Contents")
        if objects:
            # 各オブジェクトを削除
            for obj in objects:
                self.s3_client.delete_object(Bucket=self.bucket_name, Key=obj["Key"])
