#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Workout, UserWorkout, WorkoutCalendarEvent
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Users(Resource):
    def get(self):
        users = User.query.all()
        users_list = [user.to_dict() for user in users]
        return make_response(users_list, 200)
    
api.add_resource(Users, '/users')

class Workouts(Resource):
    def get(self):
        workouts = Workout.query.all()
        workouts_list = [workout.to_dict() for workout in workouts]
        return make_response(workouts_list, 200)
    
    def post(self):
        params = request.json
        try:
            workout = Workout(name=params['name'],
                            force=params['force'],
                            level=params['level'],
                            mechanic=params['mechanic'],
                            equipment=params['equipment'],
                            primary_muscles=params['primaryMuscles'],
                            secondary_muscles=params['secondaryMuscles'],
                            instructions=params['instructions'],
                            category=params['category'])
            db.session.add(workout)
            db.session.commit()
            return make_response(workout.to_dict(), 201)
        except Exception as e:
            return make_response(str(e), 400)
        
api.add_resource(Workouts, '/workouts')

class WorkoutById(Resource):
    def get(self, id):
        workout = Workout.query.filter_by(id=id).first()
        if workout:
            return make_response(workout.to_dict(), 200)
        else:
            return make_response('Workout not found', 404)
        
    def delete(self, id):
        workout = Workout.query.filter_by(id=id).first()
        if workout:
            db.session.delete(workout)
            db.session.commit()
            return make_response('Workout deleted', 200)
        else:
            return make_response('Workout not found', 404)
        
api.add_resource(WorkoutById, '/workouts/<int:id>')

class WorkoutCalendarEvents(Resource):
    def post(self):
        params = request.json
        try:
            workout_calendar_event = WorkoutCalendarEvent(
                user_id = params['user_id'],
                workout_id = params['workout_id'],
                date = params['date']
            )
            db.session.add(workout_calendar_event)
            db.session.commit()
            return make_response(workout_calendar_event.to_dict(), 201)
        except Exception as e:
            return make_response(str(e), 400)
        
api.add_resource(WorkoutCalendarEvents, '/workout_calendar_events')








#? Authentication------------------------------
class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = db.session.get(User, user_id)
            if user:
                return make_response(user.to_dict(), 200)
        return make_response({'error': 'Unauthorized: Must login'}, 401)

api.add_resource(CheckSession, '/check_session')

class SignUp(Resource):
    def post(self):
        params = request.json
        username=params.get('username')
        if User.query.filter_by(username=username).first():
            return make_response({"error": "Username already exists"}, 401)
        try:
            user = User(
                username=params.get('username'),
                first_name=params.get('first_name'),
                last_name=params.get('last_name'),
                email=params.get('email'),
                bio=params.get('bio'),
                favorite_workout=params.get('favorite_workout'),
                image_url=params.get('image_url')
            )
            user.password_hash = params.get('password')
            db.session.add(user)
            db.session.commit()
            #! Add when posts and follows work
            # user_BlogThat = User.query.filter_by(username="BlogThat").first()
            # follow_BlogThat = Follow(following_user_id = user_BlogThat.id,
            #     follower_user_id = user.id)
            # db.session.add(follow_BlogThat)
            # db.session.commit()
            session['user_id'] = user.id
            return make_response(user.to_dict(), 201)
        except Exception as e:
            return make_response({"error": str(e)}, 400)
        
api.add_resource(SignUp, '/signup')

class Login(Resource):
    def post(self):
        params = request.json
        user = User.query.filter_by(username=params.get('username')).first()
        if not user:
            return make_response({'error': 'Invalid user or password'}, 404)

        if user.authenticate(params.get('password')):
            session['user_id'] = user.id
            return make_response(user.to_dict())
        else:
            return make_response({'error': 'Invalid user or password' }, 404)

api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({}, 204)

api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

