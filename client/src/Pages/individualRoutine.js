import React, {useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import WorkoutNode from "../components/Workouts/workoutNode";
import AddWorkoutToRoutine from "../components/Routines/addWorkoutToRoutine";
import { SignedInContext } from "../components/App";


function IndividualRotuine(){ 
    const {id, user_id} = useParams()
    const [workouts, setWorkouts] = useState([])
    const [loadError, setLoadError] = useState("Loading...")
    const [userWorkouts, setUserWorkouts] = useState([])
    const [routine, setRoutine] = useState({})
    const [signedIn, setSignedIn] = useContext(SignedInContext);

    

    useEffect(() => {
        fetch(`/workouts/routine/${id}`)
        .then(resp => {
            if (resp.ok){
                resp.json().then(data => setWorkouts(data))
            } else {
                setLoadError("No Workouts in this Routine")
            }
        })
        fetch(`/user_workouts/${user_id}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => setUserWorkouts(data))
                }
            }).catch(error => console.log(error))
        fetch(`/routine/${id}`)
        .then(resp => {
            if (resp.ok){
                resp.json().then(data => setRoutine(data))
            }
        }).catch(error => setLoadError(error))
    }, [])

    const workoutsListed = workouts.map((exercise, index) => {
     return <WorkoutNode key={exercise.workout.id} 
                         workout={exercise.workout}
                         userWorkouts={userWorkouts}
                         setUserWorkouts={setUserWorkouts}/>
    })
  

    return (
        <div>
            <p>{routine.name}</p>
        {routine.user_id == signedIn.id ? <AddWorkoutToRoutine /> : ""}
            <div>
                {workoutsListed.length ? workoutsListed : <p>{loadError}</p>}
            </div>
        </div>
    )
}

export default IndividualRotuine