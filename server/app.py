#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Workout, UserWorkout, WorkoutCalendarEvent, Post, UserLikedPost, Follow, Comment
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

class UserById(Resource):
    def get(self, user_id):
        user = User.query.filter_by(id=user_id).first()
        if user:
            return make_response(user.to_dict(), 200)
        else:
            return make_response({'message': 'User not found'}, 404)
    
    def patch(self, user_id):
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)
        try:
            params = request.json
            check_username = User.query.filter(User.username == params.get('username')).first()
            if check_username and check_username.id != user_id:
                return make_response({"error": "Username already exists"}, 401)
            for attr in params:
                setattr(user, attr, params[attr])
            db.session.add(user)
            db.session.commit()

            user_dict = user.to_dict()
            return make_response(user_dict, 202)
        except Exception as e:
            return make_response({"error": str(e)}, 400)
        
    def delete(self, user_id):
        user = User.query.filter_by(id=user_id).first()
        if not user:
            response = {"error": "User not found"}
            return make_response(response, 404)
        db.session.delete(user)
        db.session.commit()

        return '', 204
        
api.add_resource(UserById, '/users/<int:user_id>')

class UserWorkouts(Resource):
    def get(self, id):
        user_workouts = UserWorkout.query.filter_by(user_id=id).all()
        user_workouts_list = [user_workout.to_dict() for user_workout in user_workouts]
        return make_response(user_workouts_list, 200)
    
    def post(self, id):
        params = request.json
        user_workout = UserWorkout(user_id=id, workout_id=params['workout_id'])
        db.session.add(user_workout)
        db.session.commit()
        return make_response(user_workout.to_dict(), 201)

api.add_resource(UserWorkouts, '/user_workouts/<int:id>')

class UserWorkoutById(Resource):
    def delete(self, user_id, workout_id):
        user_workout = UserWorkout.query.filter_by(user_id=user_id, workout_id=workout_id).first()

        if user_workout:
            db.session.delete(user_workout)
            db.session.commit()
            return make_response({"message": "Workout deleted"}, 200)
        else:
            return make_response({'message': 'UserWorkout not found'}, 404)

api.add_resource(UserWorkoutById, '/user_workout/<int:user_id>/<int:workout_id>')





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

class WorkoutsCalendarEvent(Resource):
    def get(self):
        user_id = request.args.get('user_id')
        date = request.args.get('date')
        workout_calendar_events = WorkoutCalendarEvent.query.filter_by(user_id=user_id, date=date).all()
        if workout_calendar_events:
            workouts_list = []
            for workout_calendar_event in workout_calendar_events:
                workout = Workout.query.filter_by(id=workout_calendar_event.workout_id).first()
                workouts_list.append(workout.to_dict())
            return make_response(workouts_list, 200)
        else:
            return make_response('Workouts not found', 404)

api.add_resource(WorkoutsCalendarEvent, '/workouts_calendar_event')







class Posts(Resource):
    def get(self):
        posts = Post.query.all()
        if posts:
            posts = [post.to_dict() for post in posts]
            return make_response(posts, 200)
        else:
            return make_response('Posts not found', 404)
        
    #creates a new post
    def post(self):
        try:
            params = request.json
            content = params.get('content')
            user_id = session['user_id']
            
            if content is None or user_id is None:
                raise ValueError("Missing 'content' or 'user_id' in the request data.")
            
            new_post = Post(
                content=content,
                user_id=user_id
            )
            db.session.add(new_post)
            db.session.commit()
            
            return make_response(new_post.to_dict(), 201)
        
        except ValueError as v_error:
            return make_response({'errors': [str(v_error)]}, 400)
        
        except Exception as e:
            return make_response({'errors': ['An unexpected error occurred.']}, 500)
        
api.add_resource(Posts, '/posts')


class PostsById(Resource):
    def get(self, post_id):
        post = Post.query.filter_by(id=post_id).first()
        if post:
            return make_response(post.to_dict(), 200)
        else:
            return make_response('Post not found', 404)
        
    def patch(self, post_id):
        post = Post.query.filter(Post.id == post_id).first()
        if not post:
            return make_response({"error": "Post not found"}, 404)
        
        try:
            params = request.json
            for attr in params:
                setattr(post, attr, params[attr])
            db.session.add(post)
            db.session.commit()

            post_dict = post.to_dict()
            return make_response(post_dict, 202)
        
        except ValueError as v_error:
            return make_response({'errors': str(v_error)}, 400)
        
api.add_resource(PostsById, '/api/post/<int:post_id>')

class AddLikeToPost(Resource):
    def patch(self, post_id):
        post = Post.query.filter_by(id=post_id).first()
        if not post:
            return make_response({"error": "Post not found"}, 404)
        if post:
            post.likes += 1
            db.session.add(post)
            db.session.commit()
            return make_response(post.to_dict(), 202)
                   
api.add_resource(AddLikeToPost, '/api/post_liked/<int:post_id>')

class SubtractLikeToPost(Resource):
    def patch(self, post_id):
        post = Post.query.filter_by(id=post_id).first()
        if not post:
            return make_response({"error": "Post not found"}, 404)
        if post:
            post.likes -= 1
            db.session.add(post)
            db.session.commit()
            return make_response(post.to_dict(), 202)
                   
api.add_resource(SubtractLikeToPost, '/api/post_unliked/<int:post_id>')

class PostsByUserId(Resource):
    def get(self, user_id):
        posts = Post.query.filter_by(user_id=user_id).all()
        if posts:
            posts = [post.to_dict() for post in posts]  
            return make_response(posts, 200)
        else:
            return make_response('Posts not found', 404)
        
api.add_resource(PostsByUserId, "/posts/user/<int:user_id>")



class CommentsByPostId(Resource):
    def get(self, post_id):
        comments = Comment.query.filter_by(post_id=post_id).all()
        if comments:
            comments = [comment.to_dict() for comment in comments]
            return make_response(comments, 200)
        else:
            return make_response('Comments not found', 404)
        
    def post(self, post_id):
        try:
            params = request.json
            new_comment = Comment(
                comment = params.get('comment'),
                post_id = post_id,
                user_id = session['user_id']
            )
            db.session.add(new_comment)
            db.session.commit()
            return make_response(new_comment.to_dict(), 201)
        except ValueError as v_error:
            return make_response({'errors': [str(v_error)]}, 400)

api.add_resource(CommentsByPostId, '/comments/<int:post_id>')




class LikedPost(Resource):
    def get(self, user_id, liked_post_id):
        isLiked = UserLikedPost.query.filter_by(liked_post_id=liked_post_id, user_id=user_id).first()
        if isLiked:
            return make_response(isLiked.to_dict(), 200)
        else:
            return make_response('Post not Liked', 404)
        
    def post(self, user_id, liked_post_id):
        post = UserLikedPost.query.filter_by(liked_post_id=liked_post_id, user_id=user_id).first()
        if post:
            return make_response('Post already liked', 400)
        else:
            post = UserLikedPost(liked_post_id=liked_post_id, user_id=user_id)
            db.session.add(post)
            db.session.commit()
            return make_response(post.to_dict(), 201)
        
    def delete(self, user_id, liked_post_id):
        post = UserLikedPost.query.filter_by(liked_post_id=liked_post_id, user_id=user_id).first()
        if post:
            db.session.delete(post) 
            db.session.commit()
            return make_response('Post deleted', 200)
        else:
            return make_response('Post not found', 404)
        
api.add_resource(LikedPost, '/liked_post/<int:user_id>/<int:liked_post_id>')



class Following(Resource):
    #returns all users that the user is following
    def get(self):
        following = Follow.query.filter_by(follower_user_id = session['user_id']).all()
        if following:
            following_row_list = [follow.to_dict(rules=('-follower','-following')) for follow in following]
            following_list = [User.query.get(following["following_user_id"]).to_dict() for following in following_row_list]
            return make_response(following_list, 200)
        else:
            return make_response('No following', 404)
    
    #creates a new following relationship
    def post(self):
        try:
            params = request.json
            new_follow = Follow(
                following_user_id = params.get('user_id'),
                follower_user_id = session['user_id']
            )
            db.session.add(new_follow)
            db.session.commit()
            return make_response(new_follow.to_dict(), 201)
        except ValueError as v_error:
            return make_response({'errors': [str(v_error)]}, 400)
    
        
api.add_resource(Following, '/following')

class FollowingByUserId(Resource):
    def get(self, user_id):
        following = Follow.query.filter_by(follower_user_id = user_id).all()
        if following:
            following_row_list = [follow.to_dict(rules=('-follower','-following')) for follow in following]
            following_list = [User.query.get(following["following_user_id"]).to_dict() for following in following_row_list]
            return make_response(following_list, 200)
        else:
            return make_response('No following', 404)
    
api.add_resource(FollowingByUserId, '/following/<int:user_id>')

class FollowersByUserId(Resource):
    def get(self, user_id):
        followers = Follow.query.filter_by(following_user_id = user_id).all()
        if followers:
            followers_row_list = [follower.to_dict(rules=('-follower','-following')) for follower in followers]
            followers_list = [User.query.get(follower["follower_user_id"]).to_dict() for follower in followers_row_list]
            return make_response(followers_list, 200)
        else:
            return make_response('No followers', 404)
    
api.add_resource(FollowersByUserId, '/followers/<int:user_id>')

#deletes a following relationship
class Unfollow(Resource):
    def delete(self, id):
        follow = Follow.query.filter_by(following_user_id=id, follower_user_id=session['user_id']).first()
        
        if not follow:
            response = {"error": "User is not following or the relationship does not exist"}
            return make_response(response, 404)

        db.session.delete(follow)
        db.session.commit()
        
        return '', 204

api.add_resource(Unfollow, '/unfollow/<int:id>')





#? Athorization------------------------
class SearchResultsMax(Resource):
    def get(self):
        if not session.get('user_id'):
            session['search_results_viewed'] = 0 if not session.get('search_results_viewed') else session.get('search_results_viewed')
            session['search_results_viewed'] += 1

            if session['search_results_viewed'] <= 6:
                return make_response({"message": "Good to keep browsing"}, 200) 

            return {'message': 'Maximum searches limit reached'}, 401

api.add_resource(SearchResultsMax, '/search_results_max')


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

