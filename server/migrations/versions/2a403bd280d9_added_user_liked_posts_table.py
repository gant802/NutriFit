"""added: user_liked_posts table

Revision ID: 2a403bd280d9
Revises: 46bc574630ab
Create Date: 2024-07-05 13:58:13.145613

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2a403bd280d9'
down_revision = '46bc574630ab'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_liked_posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('liked_post_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['liked_post_id'], ['posts.id'], name=op.f('fk_user_liked_posts_liked_post_id_posts')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_user_liked_posts_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_liked_posts')
    # ### end Alembic commands ###