import React, {useState, useContext} from "react";
import { SignedInContext } from "../App";

function CreateRoutine({setShownRoutines, shownRoutines}) {
    const [signedIn, setSignedIn] = useContext(SignedInContext);
    const [routineName, setRoutineName] = useState("")
    const [imageURL, setImageURL] = useState("")


    function createRoutine(routineName){
        fetch('/routines', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: routineName,
                user_id: signedIn.id,
                image_src: imageURL
            })
        }).then(resp => {
            if (resp.ok) resp.json().then(data => setShownRoutines([data,...shownRoutines]))
        })
    }

    return (
        <div>
            <input type="text" value={routineName} onChange={(e) => setRoutineName(e.target.value)} placeholder="My Bicep Day..." />
            <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} placeholder="http//pictureURL..." />
            <button onClick={() => createRoutine(routineName)}>Create</button>
        </div>
    )
}

export default CreateRoutine