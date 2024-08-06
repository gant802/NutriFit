import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import WorkoutNode from "../components/workoutNode";


function IndividualRotuine(){ 
    const {id, user_id} = useParams()
    const [workouts, setWorkouts] = useState([])
    const [loadError, setLoadError] = useState("Loading...")
    const [userWorkouts, setUserWorkouts] = useState([])
  
    

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
    }, [])

    const workoutsListed = workouts.map((exercise, index) => {
     return <WorkoutNode key={exercise.workout.id} 
                         workout={exercise.workout}
                         userWorkouts={userWorkouts}
                         setUserWorkouts={setUserWorkouts}/>
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