import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SignedInContext } from "./App";
import UserNode from "./userNode";

function Navbar() {
    const [signedIn] = useContext(SignedInContext);
    const [allUsers, setAllUsers] = useState([])
    const [searchInput, setSearchInput] = useState("")


    // Gets all users from backend
    useEffect(() => {
        fetch('/users')
        .then(res => res.json())
        .then(data => setAllUsers(data))
    }, [])

    // Found users that match the search input
    const usersFound = allUsers.map(user => {
        if (user.username.toLowerCase().includes(searchInput.toLowerCase())) {
            return <UserNode key={user.id} user={user} setSearchInput={setSearchInput}/>
        }
    })

    

    return (
        <div id="navbarCont">

            <div id="websiteNameLogoCont">
                <div>
                    <NavLink id="websiteName" to="/">NutriFit</NavLink>
                    <img id="nutrifitLogo" src={process.env.PUBLIC_URL + '/45075620.jpg'} alt="nutrifit logo" />
                </div>
                <div id="searchUsersCont">
                    <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} id="userSearchBar"placeholder="Search Users..." />
                    <div id="userResultsCont">
                        {searchInput ? usersFound : ""}
                    </div>
                </div>
            </div>
            
            <div id="navbarButtonsCont">
                <NavLink className="navButtons" to='/home'>Home</NavLink>
                <div className="navbarLineBreak">l</div>
                <NavLink className="navButtons" to={`/workoutsPage/${signedIn.id}`}>Workouts</NavLink>
                <div className="navbarLineBreak">l</div>
                <NavLink className="navButtons" to={`/routines/${signedIn.id}`}>Routines</NavLink>
                <div className="navbarLineBreak">l</div>
                <NavLink className="navButtons" to='/nutrition'>Nutrition</NavLink>
                <div className="navbarLineBreak">l</div>
                <NavLink className="navButtons" to={`/calendar/${signedIn.id}`}>Calendar</NavLink>
                <div className="navbarLineBreak">l</div>
                {signedIn ? <NavLink className="navButtons" to={`/userProfile/${signedIn.id}`}>My Profile</NavLink> : <NavLink className="navButtons" to='/loginOrCreate'>Login</NavLink>}
            </div>

        </div>
    )
}

export default Navbar