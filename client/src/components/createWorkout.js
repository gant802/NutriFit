import React, {useState} from "react";
import { Formik } from "formik";
import * as yup from 'yup'

function CreateWorkout({workouts, setWorkouts, toggleAdd, setToggleAdd}) {
    const [errors, setErrors] = useState({})


    function handleCreateSubmit(values) {
        fetch('/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setWorkouts([...workouts, data])
                    setToggleAdd(!toggleAdd)
                })
            }
        }).catch(error => setErrors({"error": error}))
    }


    let createWorkoutSchema = yup.object().shape({
        name: yup.string().max(50, 'Character limit reached!').required(),
        force: yup.string().max(50, 'Character limit reached!').required(),
        level: yup.string().required(),
        mechanic: yup.string().required(),
        equipment: yup.string().max(50, 'Character limit reached!').required(),
        primaryMuscles: yup.string().max(70, 'Character limit reached!').required(),
        secondaryMuscles: yup.string().max(70, 'Character limit reached!').required(),
        instructions: yup.string().max(3500, 'Character limit reached!').required(),
        category: yup.string().max(50, 'Character limit reached!').required()
    })

    return (
        <div id="createWorkoutCont">

            <Formik
                initialValues={{
                    name: "",
                    force: "",
                    level: "",
                    mechanic: "",
                    equipment: "",
                    primaryMuscles: "",
                    secondaryMuscles: "",
                    instructions: "",
                    category: ""
                }}
                validationSchema={createWorkoutSchema}
                onSubmit={handleCreateSubmit}
            >
                {(props) => {
                    const { values: {
                        name,
                        force,
                        level,
                        mechanic,
                        equipment,
                        primaryMuscles,
                        secondaryMuscles,
                        instructions,
                        category }, handleChange, handleSubmit, errors } = props
                    return (<form id="createWorkoutForm" onSubmit={handleSubmit}>
                        <label>Workout Name: </label>
                        <input onChange={handleChange} value={name}
                            type="text" name="name" placeholder="bench press" />

                        <label>Force: </label>
                        <input onChange={handleChange} value={force}
                            type="text" name="force" placeholder="push" />

                        <label>Level: </label>
                        <select onChange={handleChange} value={level} name="level">
                            <option value="" >Select</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="expert">Expert</option>
                        </select>

                        <label>Mechanic: </label>
                        <select onChange={handleChange} value={mechanic} name="mechanic">
                            <option value="" >Select</option>
                            <option value="compound">Compound</option>
                            <option value="isolation">Isolation</option>
                            <option value="none">None</option>
                        </select>

                        <label>Equipment: </label>
                        <input onChange={handleChange} value={equipment}
                            type="text" name="equipment" placeholder="dumbells" />

                        <label>Primary Muscles: </label>
                        <input onChange={handleChange} value={primaryMuscles}
                            type="text" name="primaryMuscles" placeholder="pecs, triceps" />

                        <label>Secondary Muscles: </label>
                        <input onChange={handleChange} value={secondaryMuscles}
                            type="text" name="secondaryMuscles" placeholder="biceps, traps" />

                        <label>Instructions: </label>
                        <textarea onChange={handleChange} value={instructions}
                            type="text" name="instructions" placeholder="Lie flat on a bench with your feet planted firmly on the ground..." />

                        <label>Category: </label>
                        <input onChange={handleChange} value={category}
                            type="text" name="category" placeholder="strength" />


                        <button id="createWorkoutButton" type="submit">Create Workout</button>
                    </form>)
                }}
            </Formik>

        </div>
    )
}

export default CreateWorkout