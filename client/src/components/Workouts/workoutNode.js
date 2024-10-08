import React, { useState, useEffect, useContext } from "react";
import { SignedInContext } from "../App";


function WorkoutNode({ workout, calendarPage, addToCalendar, userWorkouts, setUserWorkouts }) {
    const [showDetails, setShowDetails] = useState(false);
    const [isAddedToProfile, setIsAddedToProfile] = useState(false)
    const [isAddedToCalendar, setIsAddedToCalendar] = useState(false)
    const [signedIn] = useContext(SignedInContext)

    //Checks if the workout is added to the user's profile or not
    useEffect(() => {
        if (userWorkouts && userWorkouts.find(workoutFound => workoutFound.workout_id === workout.id)) {
            setIsAddedToProfile(true)
        }  
    }, [userWorkouts])

    //? Logic to add a workout to the calendar
    function handleAddToCalendar() {
        addToCalendar(workout)
        setIsAddedToCalendar(true)
    }

    //? Logic to add a workout to the user's profile
    function handleAddToProfile() {

        //! Checks if a user is signed in or not
        if (!signedIn) {
            return alert("You must be signed in to add workouts to your profile.")
        }
        if (!isAddedToProfile) {
            fetch(`/user_workouts/${signedIn.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    workout_id: workout.id
                })
            }).then(res => {
                if (res.ok) {
                    setIsAddedToProfile(true)
                }
            }).catch(error => console.log(error))
        }
        else {
            fetch(`/user_workout/${signedIn.id}/${workout.id}`, {
                method: "DELETE"
            }).then(res => {
                if (res.ok) {
                    res.json().then(res => {
                        const workoutsFiltered = userWorkouts.filter(userWorkout => userWorkout.workout.id !== workout.id)
                        setUserWorkouts(workoutsFiltered)
                        setIsAddedToProfile(false)
                    })
                }
            })
        }

    }




    return (
        <div className="workoutNodeCont">
            <div>
                <div className="workoutNodeDetailsOuter">
                <h2 className="showWorkoutDetails" onClick={() => setShowDetails(!showDetails)}>{showDetails ? "Close Details" : "Show Details"}</h2>
                {!showDetails ? <h3>{workout.name}</h3> :
                    <div className="workoutDetailsCont">
                        <div>
                            <h3>{workout.name}</h3>
                            <p><strong>Equipment:</strong> {workout.equipment}</p>
                            <p><strong>Category:</strong> {workout.category}</p>
                            <p><strong>Mechanic:</strong> {workout.mechanic}</p>
                            <p><strong>Force:</strong> {workout.force}</p>
                            <p><strong>Level:</strong> {workout.level}</p>
                            <p><strong>Primary Muscles:</strong> {workout.primary_muscles}</p>
                            <p><strong>Secondary Muscles:</strong> {workout.secondary_muscles}</p>
                        </div>
                        <div>
                            <p className="instructionsText"><strong>Instructions:</strong> {workout.instructions}</p>
                        </div>
                    </div>}
            </div>
            
            <div className="addWorkoutButton">
                {calendarPage
                    ? <button className="workoutPageButtons" onClick={handleAddToCalendar}>{isAddedToCalendar ? "Added To Calendar!" : "Add To Calendar"}</button>
                    : <button className="workoutPageButtons" onClick={handleAddToProfile}>{isAddedToProfile ? "Remove From Profile" : "Add to Profile"}</button>}
            </div>
            </div>
            <div>
                {!showDetails ? <img className="workoutNodeImage" src={workout.image_url}/> : ""}
            </div>
                    
        </div>
    )
}

export default WorkoutNode