"""empty message

Revision ID: 90104682bfae
Revises: 
Create Date: 2023-07-04 09:03:22.995024

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '90104682bfae'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        'users',
        sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False, comment='ユーザー名'),
        sa.Column('email', sa.String(length=255), nullable=True, comment='メールアドレス'),
        sa.Column('password', sa.String(length=255), nullable=True, comment='パスワード'),
        sa.Column('role', sa.Integer(), nullable=True, comment='ロール. 0:admin, 1:member'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email'),
        comment='usersテーブル'
    )
    op.create_table(
        'tokens',
        sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column('token', sa.String(length=255), nullable=False, comment='アクセストークン'),
        sa.Column('user_id', sa.BigInteger(), nullable=False, comment='ユーザーID'),
        sa.Column('expired_at', sa.DateTime(), nullable=False, comment='トークンの有効期限'),
        sa.Column('last_login_at', sa.DateTime(), nullable=False, comment='最終ログイン日時'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(
            ['user_id'],
            ['users.id'],
        ),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('token'),
        comment='トークンテーブル'
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tokens')
    op.drop_table('users')
    # ### end Alembic commands ###