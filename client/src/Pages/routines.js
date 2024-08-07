import React, { useEffect, useState, useContext } from "react";
import CreateRoutine from "../components/Routines/createRoutine";
import RoutineNode from "../components/Routines/routineNode";
import SearchRoutines from "../components/Routines/searchRoutines";
import { SignedInContext } from "../components/App";

function RoutinesPage() {
    const [shownRoutines, setShownRoutines] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [signedIn] = useContext(SignedInContext)

    useEffect(() => {
        fetch('http://127.0.0.1:5555/routines')
            .then(resp => {
                if (resp.ok) {
                    resp.json().then(data => setShownRoutines(data))
                }
            })
    }, [])


    const routinesListed = shownRoutines.map(routine => {
        if (routine.name.toLowerCase().includes(searchInput.toLowerCase())){
            return <RoutineNode signedIn={signedIn} key={routine.id} routine={routine} />
        } 
        
    })

    return (
        <div>
            <h1>Routines</h1>
            <div>
                <p>Search Routines</p>
                <SearchRoutines setSearchInput={setSearchInput} searchInput={searchInput}/> 
            </div>
            <div>
                <p>Create Routine</p>
                <CreateRoutine setShownRoutines={setShownRoutines} shownRoutines={shownRoutines} />
            </div>
            <div>
                {routinesListed}
            </div>
        </div>
    )
}

export default RoutinesPage