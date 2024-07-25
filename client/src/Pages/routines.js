import React, {useEffect, useState} from "react";
import CreateRoutine from "../components/createRoutine";
import RoutineNode from "../components/routineNode";

function RoutinesPage(){
    const [shownRoutines, setShownRoutines] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:5555/routines')
        .then(resp => {
            if (resp.ok){
                resp.json().then(data => setShownRoutines(data))
            }
        })
    })

    const routinesListed = shownRoutines.map(routine => {
        return <RoutineNode key={routine.id} routine={routine}/> 
    })

    return (
        <div>
            <h1>Routines</h1>
            <div>
                <p>-Create your own routines</p>
                <p>-Add to existing routines</p>
                <p>-Edit your routines</p>
                <p>-Get rid of routines</p>
            </div>
            <div>
                <CreateRoutine />
                <div>
                    {routinesListed}
                </div>
            </div>
        </div>
    )
}

export default RoutinesPage