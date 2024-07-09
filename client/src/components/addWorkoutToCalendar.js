import React, { useState } from "react";
import WorkoutNode from "./workoutNode";


function AddWorkoutToCalendar({ workouts, date, signedIn, workoutsOnDay, setWorkoutsOnDay }) {
    const [searchInput, setSearchInput] = useState("");
    const [calendarPage, setCalendarPage] = useState(true);


    //? Adds workout to the calendar for a specific day
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
            .then(resp => {
                setWorkoutsOnDay(() => [...workoutsOnDay, data]);
            })
            .catch(error => {
                console.log(error);
                alert('An error occurred while fetching data. Please try again later.');
            })
    }


    //Filter workouts based on search input
    const filteredWorkouts = workouts.filter(workout => {
        return workout.name.toLowerCase().includes(searchInput.toLowerCase())
    })

    //Render the filtered workouts immediatly to the page
    const workoutsListed = filteredWorkouts.map(workout => {
        return <WorkoutNode key={workout.id} workout={workout} calendarPage={calendarPage} addToCalendar={addWorkoutToCalendar} />
    })



    return (
        <div id="addWorkoutCont">
            
            <div id="addWorkoutHeader">
                <h2>Add workout</h2>
                <input
                    id="searchInputAddToCalendar"
                    type="text"
                    placeholder="Search for workouts by name..."
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value)
                    }}
                />
                <button id="searchButtonAddToCalendar">Search</button>
            </div>
            <div id="addWorkoutToCalendarResultsCont">
                {searchInput === "" ? "" : workoutsListed}
            </div>

        </div>
    )
}

export default AddWorkoutToCalendar