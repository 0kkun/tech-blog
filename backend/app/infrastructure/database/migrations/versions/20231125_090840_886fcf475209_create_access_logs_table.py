"""create access_logs table

Revision ID: 886fcf475209
Revises: a1022f67f02d
Create Date: 2023-11-25 09:08:40.262930+09:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '886fcf475209'
down_revision: Union[str, None] = 'a1022f67f02d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('access_logs',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('visit_url', sa.String(length=128), nullable=False, comment='アクセスしたページのURL'),
    sa.Column('article_id', sa.BigInteger(), nullable=True, comment='記事ID'),
    sa.Column('user_agent', sa.String(length=255), nullable=False, comment='ユーザーエージェント'),
    sa.Column('target_year', sa.Integer(), nullable=True, comment='対象年'),
    sa.Column('target_month', sa.Integer(), nullable=True, comment='対象月'),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['article_id'], ['articles.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    comment='アクセス数を管理するテーブル'
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('access_logs')
    # ### end Alembic commands ###
