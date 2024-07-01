import React, { useContext, useState, useEffect } from "react";
import { SignedInContext } from "../components/App";
import { useNavigate, useParams } from "react-router-dom";
import WorkoutNode from "../components/workoutNode";

function UserProfile() {
    const [signedIn, setSignedIn] = useContext(SignedInContext)
    const [userWorkouts, setUserWorkouts] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()
    let workoutsListed;

    useEffect(() => {
        fetch(`/user_workouts/${id}`)
        .then(res => {
            if(res.ok){
                res.json().then(data => setUserWorkouts(() => data))
            }
        }).catch(error => console.log(error))
    }, [])


    //? Function to log user out
    function logout() {
        fetch('/logout', {
            method: 'DELETE'
        }).then(resp => {
            if (resp.ok) {
                setSignedIn(false)
                navigate('/')
            }
        })
    }

    if (userWorkouts) {
        workoutsListed = userWorkouts.map(workout => {
        return <WorkoutNode signedIn={signedIn} key={workout.id} workout={workout.workout} setUserWorkouts={setUserWorkouts} userWorkouts={userWorkouts}/>
    })
    }

    

    return (
        <div>
            <div id="userInfoCont">
                <h1>User {signedIn.username} Profile page</h1>
            <button onClick={logout}>Logout</button>
            </div>
            <div>
                <h2>Workouts</h2>
                {workoutsListed}
            </div>
        </div>
    )
}

export default UserProfile