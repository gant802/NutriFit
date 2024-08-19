import React from "react";
import { Link } from "react-router-dom";

function RoutineNode({routine, signedIn}){

    console.log(routine)
    
    return (
        <div>
            <img className="routineImage"
                src={routine.image_src 
                ? routine.image_src 
                : "https://alexandriaymca.com/sites/default/files/styles/node_blog/public/2024-06/morning-exercise-story.png.webp?itok=C7aHWwlo"} 
                alt="routine image"/>
            <Link to={`/routine/${routine.id}/${signedIn.id}`}>{routine.name}</Link>
        </div>
    )
}

export default RoutineNode