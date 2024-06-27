import React, {useEffect, useState, useContext} from "react";
import AddWorkoutToCalendar from "./addWorkoutToCalendar";
import { SignedInContext } from "../components/App";
import WorkoutNode from "./workoutNode";

function SelectedDayContainer({date}){
    const [workouts, setWorkouts] = useState([]);
    const [workoutsOnDay, setWorkoutsOnDay] = useState("")
    const [signedIn] = useContext(SignedInContext)
    let workoutsListed;

    useEffect(() => {
        fetch('/workouts')
        .then(res => res.json())
        .then(data => setWorkouts(data))
    }, [])
    
    useEffect(() => {
        setWorkoutsOnDay("")
        fetch(`/workouts_calendar_event?user_id=${signedIn.id}&date=${date.toString().substring(0, 15)}`)
        .then(res => {
            if(res.ok){
                res.json().then(data => setWorkoutsOnDay(data))
            }
        })
    }, [date])

    if (workoutsOnDay) {
        workoutsListed = workoutsOnDay.map(workout => {
        return <WorkoutNode key={workout.id} workout={workout} />
    })
    }

    
    

    return (
        <div>
            <p>{date.toString().substring(0, 15)}</p>
            <AddWorkoutToCalendar signedIn={signedIn} date={date} workouts={workouts}/>
            {workoutsListed}
        </div>
    )
}

export default SelectedDayContainer