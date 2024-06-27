import React from "react";
import WorkoutNode from "./workoutNode";

function WorkoutsContainer({workouts}){

    const workoutsListed = workouts.map(workout => {
        return <WorkoutNode key={workout.id} workout={workout}/>
    })

    return(
        <div id="workoutsListCont">
            {workoutsListed} 
        </div>
       
    )
}

export default WorkoutsContainer