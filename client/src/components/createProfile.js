import React, { useState, useContext } from "react";
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { SignedInContext } from "./App";

function CreateProfile({ switchPage, setSwitchPage }) {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [signedIn, setSignedIn] = useContext(SignedInContext)

    //? Function to handle registering as a user
    function handleSignupSubmit(values) {
        console.log(values)
        fetch('/signup', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(resp => {
                if (resp.ok) {
                    resp.json().then(user => {
                        setSignedIn(user);
                        navigate('/');
                    });
                }
                else {
                    resp.json().then((error) => {
                        setError(error)
                    })
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Schema to validate user input for signing up
    let createProfileSchema = yup.object().shape({
        first_name: yup.string().max(20, 'First name too Long!').required(),
        last_name: yup.string().max(20, 'Last name too Long!').required(),
        username: yup.string().max(20, 'Username too Long!').required(),
        password: yup.string().max(20, 'Password too Long!').required(),
        password_confirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required(),
        image_url: yup.string(),
        email: yup.string().email().required(),
        bio: yup.string().max(199, 'Bio too Long!'),
        favorite_workout: yup.string().max(30, 'Favorite Workout Too Long!')
    })


    return (
        <div id="signupFormCont">

            <Formik
                initialValues={{
                    first_name: "",
                    last_name: "",
                    username: "",
                    password: "",
                    password_confirmation: "",
                    image_url: "",
                    email: "",
                    bio: "",
                    favorite_workout: ""
                }}
                validationSchema={createProfileSchema}
                onSubmit={handleSignupSubmit}
            >
                {(props) => {
                    const { values: {
                        first_name,
                        last_name,
                        username,
                        password,
                        password_confirmation,
                        image_url,
                        email,
                        bio,
                        favorite_workout
                    },
                        handleChange, handleSubmit, errors } = props
                    return (<form className="signupEditForm" onSubmit={handleSubmit}>
                        <p>*required fields</p>
                        <label>*First Name: </label>
                        <input onChange={handleChange} value={first_name}
                            type="text" name="first_name" />
                        <p className="errorText">{errors.first_name}</p>

                        <label>*Last Name: </label>
                        <input onChange={handleChange} value={last_name}
                            type="text" name="last_name" />
                        <p className="errorText">{errors.last_name}</p>

                        <label>*Username: </label>
                        <input onChange={handleChange} value={username}
                            type="text" name="username" />
                        <p className="errorText">{errors.username}</p>

                        <label>*Password: </label>
                        <input onChange={handleChange} value={password}
                            type="text" name="password" />
                        <p className="errorText">{errors.password}</p>

                        <label>*Confirm Password: </label>
                        <input onChange={handleChange} value={password_confirmation}
                            type="text" name="password_confirmation" />
                        <p className="errorText">{errors.password_confirmation}</p>

                        <label>Profile Picture URL: </label>
                        <input onChange={handleChange} value={image_url}
                            type="text" name="image_url" />

                        <label>*Email Address: </label>
                        <input onChange={handleChange} value={email}
                            type="email" name="email" />
                        <p className="errorText">{errors.email}</p>

                        <label>Profile Bio: </label>
                        <textarea onChange={handleChange} value={bio}
                            type="text" name="bio" />

                        <label>Favorite Workout: </label>
                        <input onChange={handleChange} value={favorite_workout}
                            type="integer" name="favorite_workout" />
                        <p className="errorText">{errors.favorite_workout}</p>

                        {error ? <p className="signupEditErrorMessage">{error.error}</p> : ""}

                        <button type="submit">Create Profile</button>


                    </form>)
                }}
            </Formik>
            {switchPage ? <p className="loginCreateErrorText">{error.error}</p> : ""}
        </div>
    )
}

export default CreateProfile