import React, {useState} from "react";

function CreateRoutine() {

    const [routineName, setRoutineName] = useState("")


    function createRoutine(routineName){
        console.log(routineName)
    }

    return (
        <div>
            <input type="text" value={routineName} onChange={(e) => setRoutineName(e.target.value)} placeholder="My Bicep Day..." />
            <button onClick={() => createRoutine(routineName)}>Create</button>
        </div>
    )
}

export default CreateRoutine