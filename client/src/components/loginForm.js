import React, { useContext, useState } from "react";
import { Formik } from 'formik';
import * as yup from 'yup';
import { SignedInContext } from "../components/App";
import { useNavigate } from "react-router-dom";


function LoginForm({ switchPage, setSwitchPage }) {
    const [signedIn, setSignedIn] = useContext(SignedInContext)
    const [error, setError] = useState("")
    const navigate = useNavigate()


    //? Function to handle a user loggin in
    function handleLogin(values) {
        console.log(values)
        fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(values)
        }).then((resp) => {
            if (resp.ok) {
                resp.json().then((user) => {
                    setSignedIn(user);
                    navigate('/')
                });
            } else {
                resp.json().then((error) => {
                    setError(error);
                })
            }
        })
            .catch((error) => {
                setError(error);
            });
    }

    let loginSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
        password_confirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required()
    })

    return (
        <div id="loginCont">

            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    password_confirmation: ''
                }}
                validationSchema={loginSchema}
                onSubmit={handleLogin}>
                {(props) => {
                    const { values: { username, password, password_confirmation }, handleChange, handleSubmit, errors } = props
                    return (
                        <form className="loginSignupEditForm" onSubmit={handleSubmit}>
                            <label htmlFor="username">Username: </label>
                            <input id="username" onChange={handleChange} value={username}
                                type="text" name="username" />

                            <label htmlFor="password">Password: </label>
                            <input id="password" onChange={handleChange} value={password}
                                type="text" name="password" />

                            <label htmlFor="password_confirmation">Confirm Password: </label>
                            <input id="password_confirmation" onChange={handleChange} value={password_confirmation}
                                type="text" name="password_confirmation" />

                            <button type="submit">Submit</button>
                        </form>
                    )
                }}
            </Formik>
            {!switchPage ? <p className="loginCreateErrorText">{error.error}</p> : ""}

        </div>
    )
}

export default LoginForm