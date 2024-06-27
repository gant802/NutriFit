import React, {useState} from "react";

function WorkoutNode({workout, calendarPage, addToCalendar}){
    const [showDetails, setShowDetails] = useState(false);

    function handleAddToCalendar(){
        addToCalendar(workout)
    }


    return(
        <div className="workoutNodeCont">
            {calendarPage ? <button onClick={handleAddToCalendar}>Add to Calendar</button> : <button>Add to Profile</button>}
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