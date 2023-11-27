from sqlalchemy.orm import Session
from app.infrastructure.database.schema_model.article_tag import ArticleTagOrm
from app.seeder.base import Seeder


class ArticleTagsSeeder(Seeder):
    def run(self, db: Session):
        print("Seeding article_tags ...")
        article_tags = [
            ArticleTagOrm(article_id=1, tag_id=1),
            ArticleTagOrm(article_id=1, tag_id=2),
            ArticleTagOrm(article_id=2, tag_id=1),
            ArticleTagOrm(article_id=2, tag_id=2),
            ArticleTagOrm(article_id=3, tag_id=3),
            ArticleTagOrm(article_id=3, tag_id=4),
            ArticleTagOrm(article_id=4, tag_id=1),
            ArticleTagOrm(article_id=4, tag_id=2),
        ]
        db.add_all(article_tags)
        print("Seeding article_tags ... done")
