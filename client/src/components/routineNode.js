import React from "react";
import { Link } from "react-router-dom";

function RoutineNode({routine, signedIn}){
    return (
        <div>
            <Link to={`/routine/${routine.id}/${signedIn.id}`}>{routine.name}</Link>
        </div>
    )
}

export default RoutineNode