import React, { useEffect, useState, useContext } from "react";
import AddWorkoutToCalendar from "./addWorkoutToCalendar";
import { SignedInContext } from "../components/App";
import WorkoutNode from "./workoutNode";

function SelectedDayContainer({ date }) {
    const [workouts, setWorkouts] = useState([]);
    const [workoutsOnDay, setWorkoutsOnDay] = useState("")
    const [signedIn] = useContext(SignedInContext)
    const [userWorkouts, setUserWorkouts] = useState([])
    const [toggleAddWorkout, setToggleAddWorkout] = useState(false)
    let workoutsListed;

    useEffect(() => {
        fetch(`/user_workouts/${signedIn.id}`)
            .then(res => {
                if (res.ok) {
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
                if (res.ok) {
                    res.json().then(data => {
                        setWorkoutsOnDay(() => data)
                        setToggleAddWorkout(false)
                    })
                } else {
                    setToggleAddWorkout(true)
                }
            })
    }, [date])

    if (workoutsOnDay) {
        workoutsListed = workoutsOnDay.map((workout, index) => {
            return <WorkoutNode key={index} workout={workout} setUserWorkouts={setUserWorkouts} userWorkouts={userWorkouts} signedIn={signedIn} />
        })
    }




    return (
        <div id="selectedDayCont">
            <div className="workoutsForSelectedDayCont">
                <h2 id="selectedDate">{date.toString().substring(0, 15)}</h2>
                <div id="toggleCalendarCont">
                    <p className={toggleAddWorkout ? "toggleCalendarButton" : "toggleCalendarButtonActive"} onClick={() => setToggleAddWorkout(false)}>Show Workouts</p>
                    <p className={!toggleAddWorkout ? "toggleCalendarButton" : "toggleCalendarButtonActive"} onClick={() => setToggleAddWorkout(true)}>Add Workout</p>
                </div>
                   {toggleAddWorkout ?
                    <AddWorkoutToCalendar setWorkoutsOnDay={setWorkoutsOnDay} workoutsOnDay={workoutsOnDay} signedIn={signedIn} date={date} workouts={workouts} />
                    : <div id="viewWorkoutsOnCalendarCont">{workoutsListed}</div>} 
    
                
            </div>

        </div>
    )
}

export default SelectedDayContainer