"""create article table

Revision ID: 4cc783829a6f
Revises: c26a86cf7031
Create Date: 2023-10-20 04:16:08.029485

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4cc783829a6f'
down_revision = 'c26a86cf7031'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('articles',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('title', sa.String(length=128), nullable=False, comment='記事タイトル'),
    sa.Column('content', sa.Text(), nullable=False, comment='記事内容'),
    sa.Column('target_year', sa.Integer(), nullable=True, comment='対象年'),
    sa.Column('target_month', sa.Integer(), nullable=True, comment='対象月'),
    sa.Column('is_published', sa.Boolean(), nullable=False, comment='投稿済みかどうか'),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    comment='記事テーブル'
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('articles')
    # ### end Alembic commands ###
