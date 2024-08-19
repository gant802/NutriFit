import React, { useState, useContext } from "react";
import { SignedInContext } from "../App";
import { Formik } from 'formik';
import * as yup from 'yup';

function CreateRoutine({ setShownRoutines, shownRoutines, showCreate }) {
    const [signedIn, setSignedIn] = useContext(SignedInContext);
    const [error, setError] = useState("")


    function createRoutine(formData) {
        fetch('/routines', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.routine_name,
                user_id: signedIn.id,
                image_src: formData.image_src
            })
        }).then(resp => {
            if (resp.ok) {
                resp.json().then(data => {
                    setShownRoutines([data, ...shownRoutines])
                    showCreate(false)
                })
            }
        }).catch(error => setError(error))
    }

    let createRoutineSchema = yup.object().shape({
        routine_name: yup.string().max(20, 'Routine name too long').required(),
        image_src: yup.string()
    })

    return (
        <div>
            <Formik
                initialValues={{
                    routine_name: "",
                    image_src: ""
                }}
                validationSchema={createRoutineSchema}
                onSubmit={createRoutine}
            >
                {(props) => {
                    const { values: {
                        routine_name,
                        image_src
                    },
                        handleChange, handleSubmit, errors } = props
                    return (<form onSubmit={handleSubmit}>
                        <p>*required fields</p>
                        <label>*Routine Name: </label>
                        <input onChange={handleChange} value={routine_name}
                            type="text" name="routine_name" />
                        <p className="errorText">{errors.routine_name}</p>

                        <label>Image URL: </label>
                        <input onChange={handleChange} value={image_src}
                            type="text" name="image_src" />
                        <p className="errorText">{errors.image_src}</p>

                        {error ? <p className="signupEditErrorMessage">{error.error}</p> : ""}

                        <button type="submit">Create Routine</button>


                    </form>)
                }}
            </Formik>

        </div>
    )
}

export default CreateRoutine