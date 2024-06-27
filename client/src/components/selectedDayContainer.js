import React, {useEffect, useState} from "react";
import AddWorkoutToCalendar from "./addWorkoutToCalendar";

function SelectedDayContainer({date}){
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        fetch('/workouts')
        .then(res => res.json())
        .then(data => setWorkouts(data))
    }, [])


    return (
        <div>
            <p>{date.toString().substring(0, 15)}</p>
            <AddWorkoutToCalendar date={date} workouts={workouts}/>
        </div>
    )
}

export default SelectedDayContainer