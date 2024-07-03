#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Workout, UserWorkout

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Deleting data...")
        # User.query.delete()
        # Workout.query.delete()
        # UserWorkout.query.delete()


        # print("Starting seed...")
        

        # print("Creating users...")
        # user1 = User(username="user1", first_name="Todd", last_name="Peterson", 
        #              email="user1@example.com", _password_hash="password",
        #              bio="I love to workout", favorite_workout="Bicep Curls", image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUCFmkWxzIEhqBLhaxYstd-GBYrWcRPc4LyQ&s")
        # user2 = User(username="user2", first_name="Greg", last_name="Johnson", 
        #              email="user2@example.com", _password_hash="password",
        #              bio="I love to workout", favorite_workout="Tricep Extension", image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUCFmkWxzIEhqBLhaxYstd-GBYrWcRPc4LyQ&s")
        # user3 = User(username="user3", first_name="Brennan", last_name="Jackson", 
        #              email="user3@example.com", _password_hash="password",
        #              bio="I love to workout", favorite_workout="Dips", image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUCFmkWxzIEhqBLhaxYstd-GBYrWcRPc4LyQ&s")
        
        # db.session.add_all([user1, user2, user3])
        # db.session.commit()


        # print("Creating user_workouts...")
        # user_workout1 = UserWorkout(user_id=1, workout_id=1)
        # user_workout2 = UserWorkout(user_id=1, workout_id=3)
        # user_workout3 = UserWorkout(user_id=2, workout_id=2)

        # db.session.add_all([user_workout1, user_workout2, user_workout3])
        # db.session.commit()

