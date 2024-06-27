import React, {useState, useContext} from "react";
import WorkoutNode from "./workoutNode";
import { SignedInContext } from "../components/App";

function AddWorkoutToCalendar({workouts, date}){
    const [searchInput, setSearchInput] = useState("");
    const [calendarPage, setCalendarPage] = useState(true)
    const [signedIn] = useContext(SignedInContext)

    function addWorkoutToCalendar(data){
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
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    const filteredWorkouts = workouts.filter(workout => {
        return workout.name.toLowerCase().includes(searchInput.toLowerCase())
    })

    const workoutsListed = filteredWorkouts.map(workout => {
        return <WorkoutNode key={workout.id} workout={workout} calendarPage={calendarPage} addToCalendar={addWorkoutToCalendar} />
    })



    return (
        <div>
            <p>Add workout</p>
            <input
                        type="text"
                        placeholder="Search for workouts by name..."
                        value={searchInput}
                        onChange={(e) => {
                            setSearchInput(e.target.value)
                        }}
                    />
                <button>Search</button>
                {searchInput === "" ? "" : workoutsListed}
        </div>
    )
}

export default AddWorkoutToCalendar