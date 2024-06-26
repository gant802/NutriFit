import React, { useContext } from "react";
import { SignedInContext } from "../components/App";
import { useNavigate } from "react-router-dom";

function UserProfile() {
    const [signedIn, setSignedIn] = useContext(SignedInContext)
    const navigate = useNavigate()

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

    return (
        <div>
            <h1>User Profile page</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default UserProfile