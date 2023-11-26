from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import Optional, List
from app.core.models.tag import TagPutRequest, Tag, TagResponse
from app.infrastructure.database.schema_model.tag import TagOrm
from util.datetime_generator import DateTimeGenerator


class TagRepository:
    def put(
        self,
        db: Session,
        request: TagPutRequest,
    ) -> Tag:
        """
        タグを新規作成 or 更新する
        """
        datetime = DateTimeGenerator()
        now = datetime.now_datetime()

        if request.id:
            tag_data = db.query(TagOrm).filter(TagOrm.id == request.id).one_or_none()
            if tag_data is None:
                raise ValueError("Invalid tag id requested.")

            # アップデート
            tag_data.name = request.name
            tag_data.updated_at = now

            db.add(tag_data)
            db.flush()
            return Tag.from_orm(tag_data)
        else:
            # 新規作成
            tag = TagOrm(
                name=request.name,
                created_at=now,
                updated_at=now,
            )
            db.add(tag)
            db.flush()
            return Tag.from_orm(tag)

    def get(
        self,
        db: Session,
        tag_id: int,
    ) -> Optional[TagResponse]:
        """
        idを指定してタグを1件取得する
        """
        tag = db.scalars(
            select([TagOrm.id, TagOrm.name]).where(TagOrm.id == tag_id)
        ).one_or_none()

        if tag is None:
            return None
        return Tag.from_orm(tag)

    def fetch(
        self,
        db: Session,
    ) -> Optional[List[TagResponse]]:
        """
        タグ一覧取得
        """
        tags = db.query(TagOrm.id, TagOrm.name).all()
        return [TagResponse.from_orm(tag) for tag in tags]

    def delete(
        self,
        db: Session,
        tag_id: int,
    ) -> None:
        """
        タグ1件削除
        """
        tag = (
            db.query(TagOrm)
            .filter(
                TagOrm.id == tag_id,
            )
            .one_or_none()
        )

        if tag is None:
            raise ValueError("Tag does not exist")

        db.delete(tag)
