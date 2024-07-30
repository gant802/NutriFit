import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import WorkoutNode from "../components/workoutNode";

function IndividualRotuine(){ 
    const {id} = useParams()
    const [workouts, setWorkouts] = useState([])
    const [loadError, setLoadError] = useState("Loading...")

    useEffect(() => {
        fetch(`/workouts/routine/${id}`)
        .then(resp => {
            if (resp.ok){
                resp.json().then(data => setWorkouts(data))
            } else {
                setLoadError("No Workouts in this Routine")
            }
        })
    }, [])

    const workoutsListed = workouts.map((exercise, index) => {
     return <WorkoutNode key={exercise.workout.id} workout={exercise.workout}/>
    })


    return (
        <div>
            <p>{loadError}</p>
            <div>
                {workoutsListed}
            </div>
        </div>
    )
}

export default IndividualRotuine