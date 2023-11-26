from sqlalchemy.orm import Session
from app.infrastructure.database.schema_model.article_tag import ArticleTagOrm
from app.infrastructure.database.schema_model.article_thumbnail_image import ArticleThumbnailImageOrm
from app.infrastructure.database.schema_model.image import ImageOrm
from app.infrastructure.database.schema_model.access_log import AccessLogOrm
from app.infrastructure.database.schema_model.article import ArticleOrm
from app.seeder.base import Seeder
from util.datetime_generator import DateTimeGenerator


SAMPLE_CONTENT = """
# テスト記事
これはテストです。
## テストサブ
テストテストテスト
- リスト
    - リスト
    - リスト
    - リスト

```
class Test(test):
    for test in tests:
        print(test)
```
### テストサブサブ
"""

class ArticlesSeeder(Seeder):
    def run(self, db: Session):
        print('Seeding articles ...')
        datetime = DateTimeGenerator()
        now = datetime.now_datetime()
        articles = [
            ArticleOrm(
                title = 'テスト記事1',
                content = SAMPLE_CONTENT,
                target_year = now.year,
                target_month = now.month,
                is_published = True,
            ),
            ArticleOrm(
                title = 'テスト記事2',
                content = SAMPLE_CONTENT,
                target_year = now.year,
                target_month = now.month,
                is_published = True,
            ),
            ArticleOrm(
                title = 'テスト記事3',
                content = SAMPLE_CONTENT,
                target_year = now.year,
                target_month = now.month,
                is_published = True,
            ),
            ArticleOrm(
                title = 'テスト記事4',
                content = SAMPLE_CONTENT,
                target_year = now.year,
                target_month = now.month,
                is_published = False,
            ),
            ArticleOrm(
                title = 'テスト記事5',
                content = SAMPLE_CONTENT,
                target_year = now.year,
                target_month = now.month,
                is_published = False,
            ),
        ]
        db.add_all(articles)

        print('Seeding articles ... done')
