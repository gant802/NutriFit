"""add: info section to user workouts

Revision ID: f4e7b5acdb6a
Revises: 17e7c598e1ab
Create Date: 2024-07-25 10:28:26.891763

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f4e7b5acdb6a'
down_revision = '17e7c598e1ab'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_workouts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('info', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_workouts', schema=None) as batch_op:
        batch_op.drop_column('info')

    # ### end Alembic commands ###