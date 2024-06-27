import React, { useContext, useEffect, useState } from "react";
import { SignedInContext } from "../components/App";
import WorkoutsContainer from "../components/workoutsContainer";
import CreateWorkout from "../components/createWorkout";

function WorkoutsPage(){
    const [workouts, setWorkouts] = useState([]);
    const [toggleAdd, setToggleAdd] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const [signedIn] = useContext(SignedInContext)

    console.log(searchInput)

    useEffect(() => {
        fetch('/workouts')
        .then(res => res.json())
        .then(data => setWorkouts(data))
    }, [])

    const filteredWorkouts = workouts.filter(workout => {
        return workout.name.toLowerCase().includes(searchInput.toLowerCase())
    })


    return(
        <div id="workoutPageCont">
            <h1>Workouts Search💪🏻</h1>
            <input
                        id="searchInput"
                        type="text"
                        placeholder="Search for workouts by name..."
                        value={searchInput}
                        onChange={(e) => {
                            setSearchInput(e.target.value)
                        }}
                    />
                <button>Search</button>
            <button onClick={() => setToggleAdd(!toggleAdd)}>{toggleAdd ? "Back to Workouts" : "Add Workout"}</button>
            {toggleAdd ? 
            <CreateWorkout 
            workouts={workouts}
             setWorkouts={setWorkouts}
             toggleAdd={toggleAdd}
             setToggleAdd={setToggleAdd} /> : 
            <WorkoutsContainer workouts={filteredWorkouts}/>}
        </div>
    )
}

export default WorkoutsPage