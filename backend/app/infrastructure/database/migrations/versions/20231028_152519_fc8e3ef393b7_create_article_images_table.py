"""create article_images table

Revision ID: fc8e3ef393b7
Revises: e6b311d94c4b
Create Date: 2023-10-28 15:25:19.993114+09:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fc8e3ef393b7'
down_revision: Union[str, None] = 'e6b311d94c4b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('article_images',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('article_id', sa.BigInteger(), nullable=False, comment='記事ID'),
    sa.Column('image_id', sa.BigInteger(), nullable=False, comment='画像ID'),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['article_id'], ['articles.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['image_id'], ['images.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('article_id', 'image_id', name='uq_article_image'),
    comment='記事が持つ画像を管理するテーブル'
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('article_images')
    # ### end Alembic commands ###
