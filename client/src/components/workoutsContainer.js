import React, { useEffect, useState} from "react";
import WorkoutNode from "./workoutNode";
import { useParams } from "react-router-dom";

function WorkoutsContainer({workouts}){
    const [userWorkouts, setUserWorkouts] = useState([])
    const {id} = useParams()
    

    useEffect(() => {
        fetch(`/user_workouts/${id}`)
        .then(res => {
            if(res.ok){
                res.json().then(data => setUserWorkouts(data))
            }
        }).catch(error => console.log(error))
    }, [])
    

    const workoutsListed = workouts.map(workout => {
        return <WorkoutNode userWorkouts={userWorkouts} setUserWorkouts={setUserWorkouts} key={workout.id} workout={workout}/>
    })

    return(
        <div id="workoutsListCont">
            {workoutsListed} 
        </div>
       
    )
}

export default WorkoutsContainer