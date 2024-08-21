import React, {useEffect, useState} from "react";
import WorkoutNode from "../Workouts/workoutNode";

function AddWorkoutToRoutine(){
    const [allWorkouts, setAllWorkouts] = useState([])
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        fetch('/workouts')
            .then(res => res.json())
            .then(data => setAllWorkouts(data))
    }, [])

    function handAddWorkout(workoutId) {
        console.log(workoutId)
        
    }

    //Filter workouts based on search input
    const filteredWorkouts = allWorkouts.filter(workout => {
        return workout.name.toLowerCase().includes(searchInput.toLowerCase())
    })

    //Render the filtered workouts immediatly to the page
    const workoutsListed = filteredWorkouts.map(workout => {
        return (
            <div onClick={e => handAddWorkout(workout.id)}>
        <WorkoutNode key={workout.id} workout={workout} />
        </div>)
    })

    return (
        <div className="addWorkoutCont">
            
            <div className="addWorkoutHeader">
                <h2>Add workout</h2>
                <input
                    className="searchInputAddToCalendar"
                    type="text"
                    placeholder="Search for workouts by name..."
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value)
                    }}
                />
                <button className="searchButtonAddToCalendar">Search</button>
            </div>
            <div className="addWorkoutToCalendarResultsCont">
                {searchInput === "" ? "" : workoutsListed}
            </div>

        </div>
    )
}

export default AddWorkoutToRoutine