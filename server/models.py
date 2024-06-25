from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

    # serialize_rules = ()

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable = False)
    first_name = db.Column(db.String, nullable = False)
    last_name = db.Column(db.String, nullable = False)
    _password_hash = db.Column(db.String, nullable = False)
    email = db.Column(db.String, nullable = False)
    bio = db.Column(db.Integer, nullable = True)
    favorite_workout = db.Column(db.String, nullable=True)
    image_url = db.Column(db.String, nullable=True)

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
        elif User.query.filter_by(name=username).first():
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