"""added WorkoutCalendarEvents table

Revision ID: 63591be69410
Revises: 34654d811dad
Create Date: 2024-06-27 13:18:23.803532

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '63591be69410'
down_revision = '34654d811dad'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('workout_calendar_events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('workout_id', sa.Integer(), nullable=False),
    sa.Column('date', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_workout_calendar_events_user_id_users')),
    sa.ForeignKeyConstraint(['workout_id'], ['workouts.id'], name=op.f('fk_workout_calendar_events_workout_id_workouts')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('workout_calendar_events')
    # ### end Alembic commands ###
