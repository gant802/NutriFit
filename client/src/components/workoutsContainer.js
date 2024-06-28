import React, {useContext, useEffect, useState} from "react";
import WorkoutNode from "./workoutNode";
import { SignedInContext } from "./App";

function WorkoutsContainer({workouts}){
    const [signedIn] = useContext(SignedInContext);
    const [userWorkouts, setUserWorkouts] = useState([])

    useEffect(() => {
        fetch(`/user_workouts/${signedIn.id}`)
        .then(res => {
            if(res.ok){
                res.json().then(data => setUserWorkouts(data))
            }
        }).catch(error => console.log(error))
    }, [])
    

    const workoutsListed = workouts.map(workout => {
        return <WorkoutNode userWorkouts={userWorkouts} signedIn={signedIn} key={workout.id} workout={workout}/>
    })

    return(
        <div id="workoutsListCont">
            {workoutsListed} 
        </div>
       
    )
}

export default WorkoutsContainer