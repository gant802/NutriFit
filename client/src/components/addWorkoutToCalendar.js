import React, { useState } from "react";
import WorkoutNode from "./workoutNode";


function AddWorkoutToCalendar({ workouts, date, signedIn, workoutsOnDay, setWorkoutsOnDay }) {
    const [searchInput, setSearchInput] = useState("");
    const [calendarPage, setCalendarPage] = useState(true);


    function addWorkoutToCalendar(data) {
        if (!signedIn) {
            return alert("Please sign in to add a workout to your calendar");
        }
        fetch('/workout_calendar_events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                workout_id: data.id,
                date: date.toString().substring(0, 15),
                user_id: signedIn.id
            }),
        }).then(res => res.json())
            .then(data => {
                setWorkoutsOnDay([...workoutsOnDay, data]);
            })
            .catch(error => console.log(error))
    }

    const filteredWorkouts = workouts.filter(workout => {
        return workout.name.toLowerCase().includes(searchInput.toLowerCase())
    })

    const workoutsListed = filteredWorkouts.map(workout => {
        return <WorkoutNode key={workout.id} workout={workout} calendarPage={calendarPage} addToCalendar={addWorkoutToCalendar} />
    })



    return (
        <div id="addWorkoutCont">
            <div id="addWorkoutHeader">
                <h2>Add workout</h2>
                <input
                    type="text"
                    placeholder="Search for workouts by name..."
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value)
                    }}
                />
                <button>Search</button>
            </div>
            <div id="addWorkoutToCalendarResultsCont">
                {searchInput === "" ? "" : workoutsListed}
            </div>

        </div>
    )
}

export default AddWorkoutToCalendar