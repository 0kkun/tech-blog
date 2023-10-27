"""create images table

Revision ID: b99f9959845d
Revises: 560be22b3d6e
Create Date: 2023-10-25 00:53:59.757959

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b99f9959845d'
down_revision = '560be22b3d6e'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('images',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('url', sa.String(length=255), nullable=False, comment='画像のURL'),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    comment='画像パス保管テーブル'
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('images')
    # ### end Alembic commands ###