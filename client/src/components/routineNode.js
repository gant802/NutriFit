import React from "react";
import { Link } from "react-router-dom";

function RoutineNode({routine}){
    return (
        <div>
            <Link to={`/routine/${routine.id}`}>{routine.name}</Link>
        </div>
    )
}

export default RoutineNode