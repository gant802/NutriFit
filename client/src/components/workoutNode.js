import React, { useState, useEffect } from "react";

function WorkoutNode({ workout, calendarPage, addToCalendar, signedIn, userWorkouts }) {
    const [showDetails, setShowDetails] = useState(false);
    const [isAddedToProfile, setIsAddedToProfile] = useState(false)

    useEffect(() => {
        if (userWorkouts && userWorkouts.find(workoutFound => workoutFound.workout_id === workout.id)) {
            setIsAddedToProfile(true)
        }
    }, [])


    function handleAddToCalendar() {
        addToCalendar(workout)
    }

    function handleAddToProfile() {
        if (!signedIn) {
            return alert("You must be signed in to add workouts to your profile.")
        }
        if (!isAddedToProfile) {
            console.log(workout.id)
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
            console.log(workout.id)
            fetch(`/user_workout/${signedIn.id}/${workout.id}`, {
                method: "DELETE"
            }).then(res => {
                if (res.ok) {
                    res.json().then(res => setIsAddedToProfile(false))
                }
            })
        }
        
    }



    
    return (
        <div className="workoutNodeCont">
            {calendarPage ?
                <button onClick={handleAddToCalendar}>Add to Calendar</button> :
                <button onClick={handleAddToProfile}>{isAddedToProfile ? "Remove From Profile" : "Add to Profile"}</button>}
            <p onClick={() => setShowDetails(!showDetails)}>{showDetails ? "Close Details" : "Show Details"}</p>
            {!showDetails ? <h2>{workout.name}</h2> :
                <>
                    <h2>{workout.name}</h2>
                    <p>{workout.equipment}</p>
                    <p>{workout.category}</p>
                    <p>{workout.mechanic}</p>
                    <p>{workout.force}</p>
                    <p>{workout.level}</p>
                    <p>{workout.primary_muscles}</p>
                    <p>{workout.secondary_muscles}</p>
                    <p>{workout.instructions}</p>
                </>}

        </div>
    )
}

export default WorkoutNode