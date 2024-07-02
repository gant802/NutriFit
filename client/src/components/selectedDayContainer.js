import React, {useEffect, useState, useContext} from "react";
import AddWorkoutToCalendar from "./addWorkoutToCalendar";
import { SignedInContext } from "../components/App";
import WorkoutNode from "./workoutNode";

function SelectedDayContainer({date}){
    const [workouts, setWorkouts] = useState([]);
    const [workoutsOnDay, setWorkoutsOnDay] = useState("")
    const [signedIn] = useContext(SignedInContext)
    const [userWorkouts, setUserWorkouts] = useState([])
    let workoutsListed;

    useEffect(() => {
        fetch(`/user_workouts/${signedIn.id}`)
        .then(res => {
            if(res.ok){
                res.json().then(data => setUserWorkouts(() => data))
            }
        }).catch(error => console.log(error))
        fetch('/workouts')
        .then(res => res.json())
        .then(data => setWorkouts(data))
    }, [])
    
    useEffect(() => {
        setWorkoutsOnDay("")
        fetch(`/workouts_calendar_event?user_id=${signedIn.id}&date=${date.toString().substring(0, 15)}`)
        .then(res => {
            if(res.ok){
                res.json().then(data => {
                    console.log(data)
                    setWorkoutsOnDay(data)
                })
            }
        })
    }, [date])

    if (workoutsOnDay) {
        workoutsListed = workoutsOnDay.map((workout, index) => {
        return <WorkoutNode key={index} workout={workout} setUserWorkouts={setUserWorkouts} userWorkouts={userWorkouts} signedIn={signedIn}/>
    })
    }

    
    

    return (
        <div id="selectedDayCont">
             <div className="workoutsForSelectedDayCont">
            <h2 id="selectedDate">{date.toString().substring(0, 15)}</h2>
                {workoutsListed}
            </div>  
            <AddWorkoutToCalendar setWorkoutsOnDay={setWorkoutsOnDay} workoutsOnDay={workoutsOnDay} signedIn={signedIn} date={date} workouts={workouts}/>
        </div>
    )
}

export default SelectedDayContainer