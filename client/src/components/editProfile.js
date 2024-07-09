import React, { useContext, useState } from "react";
import { Formik } from "formik";
import * as yup from 'yup'
import { SignedInContext } from "../components/App";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    const [signedIn, setSignedIn] = useContext(SignedInContext);
    const navigate = useNavigate()
    const [error, setError] = useState({})

    //? Function to handle edit profile form submission
    function handleEditSubmit(values) {
        const valuesCopy = Object.assign({}, values);
        delete valuesCopy["password_confirmation"]
        if (valuesCopy["password_hash"] === '') {
                delete valuesCopy["password_hash"]
            }
        if (valuesCopy.username === signedIn.username) {
            delete valuesCopy["username"]
        }
    
        fetch(`/users/${signedIn.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(valuesCopy)
        }).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setSignedIn(() => data)
                    navigate(`/userProfile/${signedIn.id}`)
                })
            } 
        }).catch(error => {
            console.log(error);
            setError(error)
        })
    }

    //Schema to validate edit profile form data
    let editProfileSchema = yup.object().shape({
        first_name: yup.string().max(20, 'First name too Long!').required(),
        last_name: yup.string().max(20, 'Last name too Long!').required(),
        username: yup.string().max(20, 'Username too Long!').required(),
        password_hash: yup.string().max(20, 'Password too Long!'),
        password_confirmation: yup.string().oneOf([yup.ref('password_hash')], 'Passwords must match'),
        image_url: yup.string(),
        email: yup.string().email().required(),
        bio: yup.string().max(199, 'Bio too Long!'),
        favorite_workout: yup.string().max(30, 'Favorite Workout Too Long!')
    })

    //? Function to handle deleting profile
    function handleDeleteProfile(){
        fetch(`/users/${signedIn.id}`, {
            method: 'DELETE'
        }).then(res => {
            if(res.ok){
                setSignedIn(false)
                navigate('/')
            }
        })
    }

    //? Navigates back  to user profile page
    function goBackToProfile(){
        navigate(`/userProfile/${signedIn.id}`)
    }



    return (
        <div id="editProfileFormContainer">

            <h1 id="editProfileText">Edit Profile</h1>
            <Formik
                initialValues={{
                    first_name: signedIn.first_name,
                    last_name: signedIn.last_name,
                    username: signedIn.username,
                    password_hash: "",
                    password_confirmation: "",
                    image_url: signedIn.image_url,
                    email: signedIn.email,
                    bio: signedIn.bio,
                    favorite_workout: signedIn.favorite_workout
                }}
                validationSchema={editProfileSchema}
                onSubmit={handleEditSubmit}
            >
                {(props) => {
                    console.log(props)
                    const { values: {
                        first_name,
                        last_name,
                        username,
                        password_hash,
                        password_confirmation,
                        image_url,
                        email,
                        bio,
                        favorite_workout
                    },
                        handleChange, handleSubmit, errors } = props
                    return (<form className="loginSignupEditForm" onSubmit={handleSubmit}>
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

                        <label>*Password (Fill out only if you want it changed): </label>
                        <input onChange={handleChange} value={password_hash}
                            type="text" name="password_hash" />
                        <p className="errorText">{errors.password_hash}</p>

                        <label>*Confirm Password (Fill out only if you want it changed): </label>
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
                            type="text" name="favorite_workout" />
                        <p className="errorText">{errors.favorite_workout}</p>

                        {error ? <p className="registerEditErrorMessage">{error.error}</p> : ""}

                        <div id="saveChangesDeleteContainer">
                            <button id="saveChangesButton" type="submit">Save Changes</button>
                            <button id="deleteProfileButton" type="button" onClick={handleDeleteProfile}>Delete Profile</button>
                        </div>


                    </form>)
                }}
            </Formik>

            <p id="goBackToProfile" onClick={goBackToProfile}>Go back to my profile</p>
        </div>
    )
}

export default EditProfile