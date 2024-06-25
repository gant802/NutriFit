import React, { useContext } from "react";
import { SignedInContext } from "../components/App";

function WorkoutsPage(){
    const [signedIn] = useContext(SignedInContext)
    return(
        <div>
            {signedIn ? <h1>Workouts page true</h1> : <h1>Workouts page false</h1>}

        </div>
    )
}

export default WorkoutsPage