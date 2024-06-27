from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import func

from config import db, bcrypt




class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

    serialize_rules = ('-user_workouts', '-workouts')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable = False)
    first_name = db.Column(db.String, nullable = False)
    last_name = db.Column(db.String, nullable = False)
    _password_hash = db.Column(db.String, nullable = False)
    email = db.Column(db.String, nullable = False)
    bio = db.Column(db.String)
    favorite_workout = db.Column(db.String)
    image_url = db.Column(db.String)

    user_workouts = db.relationship("UserWorkout", back_populates = "user")
    workouts = association_proxy("user_workouts", "workout")
    workout_calendar_events = db.relationship("WorkoutCalendarEvent", back_populates="user")

    #encrypts password
    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    #Create an authenticate method that uses bcyrpt to verify the password against the hash in the DB with bcrypt.check_password_hash
    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    
    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise ValueError('Username cannot be empty')
        elif len(username) > 20:
            raise ValueError('Username cannot be longer than 20 characters')
        elif User.query.filter_by(username=username).first():
            raise ValueError('Username already exists')
        return username
    
    @validates('bio')
    def validate_bio(self, key, bio):
        if bio and len(bio) > 200:
            raise ValueError('Bio cannot be longer than 200 characters')
        return bio
    
    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise ValueError('Email cannot be empty')
        elif '@' not in email:
            raise ValueError('Invalid email, must contain an @')
        return email
    
    @validates('favorite_workout')
    def validate_favorite_workout(self, key, favorite_workout):
        if favorite_workout and len(favorite_workout) > 50:
            raise ValueError('Favorite workout cannot be longer than 50 characters')
        return favorite_workout
    





class Workout(db.Model, SerializerMixin):
    __tablename__ = 'workouts'

    def __repr__(self):
        return f'<Workout {self.name}>'
    
    serialize_rules = ('-user_workouts', '-user')
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    force = db.Column(db.String)
    level = db.Column(db.String)
    mechanic = db.Column(db.String)
    equipment = db.Column(db.String)
    primary_muscles = db.Column(db.String)
    secondary_muscles = db.Column(db.String)
    instructions = db.Column(db.String, nullable=False)
    category = db.Column(db.String)

    user_workouts = db.relationship("UserWorkout", back_populates = "workout")
    user = association_proxy("user_workouts", "user")

    __table_args__ = (
        db.CheckConstraint("level IN ('beginner', 'intermediate', 'expert')", name='ck_workout_level'),
    )


    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Name cannot be empty')
        elif len(name) > 100:
            raise ValueError('Name cannot be longer than 50 characters')
        return name
    
    @validates('instructions')
    def validate_instructions(self, key, instructions):
        if not instructions:
            raise ValueError('Instructions cannot be empty')
        elif len(instructions) > 3500:
            raise ValueError('Instructions cannot be longer than 200 characters')
        return instructions
    
    @validates('level')
    def validate_category(self, key, level):
        levels = ['beginner', 'intermediate', 'expert']
        if level and level not in levels:
            raise ValueError(f'Category must be one of {levels}')
        return level






class UserWorkout(db.Model, SerializerMixin):
    __tablename__ = 'user_workouts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))


    user = db.relationship("User", back_populates = "user_workouts")
    workout = db.relationship("Workout", back_populates = "user_workouts")



class WorkoutCalendarEvent(db.Model, SerializerMixin):
    __tablename__ = 'workout_calendar_events'

    serialize_rules = ('-user',)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'), nullable=False)
    date = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates="workout_calendar_events")










    # class Post(db.Model, SerializerMixin):
    #     __tablename__ = 'posts'

    #     # serialize_rules = ("-comments.post",)
  
    #     id = db.Column(db.Integer, primary_key=True)
    #     content = db.Column(db.String, nullable=False)
    #     created_at = db.Column(db.DateTime, default=func.now(), nullable=False)
    #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    #     likes = db.Column(db.Integer)

        


