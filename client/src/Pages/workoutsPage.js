import React, { useEffect, useState } from "react";
import WorkoutsContainer from "../components/Workouts/workoutsContainer";
import CreateWorkout from "../components/Workouts/createWorkout";

function WorkoutsPage() {
    const [workouts, setWorkouts] = useState([]);
    const [toggleAdd, setToggleAdd] = useState(false)
    const [searchInput, setSearchInput] = useState("")


    // Retreives all workouts
    useEffect(() => {
        fetch('/workouts')
            .then(res => res.json())
            .then(data => setWorkouts(data))
    }, [])

    // Filters workouts based on search input
    const filteredWorkouts = workouts.filter(workout => {
        return workout.name.toLowerCase().includes(searchInput.toLowerCase())
    })


    return (
        <div id="workoutPageCont">

            <div id="searchWorkoutCont">
                <h1>Workouts Search💪🏻</h1>
                <div>
                    <div>
                        <input id="searchWorkoutInput"
                            type="text"
                            placeholder="Search for workouts by name..."
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value)
                            }}
                        />
                        <button id="searchWorkoutButton">Search</button>
                    </div>

                    <button id="createWorkoutButton" onClick={() => setToggleAdd(!toggleAdd)}>{toggleAdd ? "Back to Workouts" : "Add Workout"}</button>
                </div>

            </div>

            {toggleAdd
                ? <CreateWorkout
                    workouts={workouts}
                    setWorkouts={setWorkouts}
                    toggleAdd={toggleAdd}
                    setToggleAdd={setToggleAdd} />
                : <WorkoutsContainer workouts={filteredWorkouts} />}

        </div>
    )
}

export default WorkoutsPage