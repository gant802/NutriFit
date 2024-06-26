import React, { useContext, useEffect, useState } from "react";
import { SignedInContext } from "../components/App";
import WorkoutsContainer from "../components/workoutsContainer";

function WorkoutsPage(){
    const [workouts, setWorkouts] = useState([]);
    const [signedIn] = useContext(SignedInContext)

    useEffect(() => {
        fetch('/workouts')
        .then(res => res.json())
        .then(data => setWorkouts(data))
    }, [])


    return(
        <div id="workoutPageCont">
            <h1>Workouts Search💪🏻</h1>

            <WorkoutsContainer workouts={workouts}/>
        </div>
    )
}

export default WorkoutsPage