import React from "react";
import WorkoutNode from "./workoutNode";

function WorkoutsContainer({workouts}){

    const workoutsListed = workouts.map(workout => {
        return <WorkoutNode key={workout.id} workout={workout}/>
    })

    return(
        <div id="workoutsListCont">
            <h2>Workout container</h2>
            {workoutsListed} 
        </div>
       
    )
}

export default WorkoutsContainer