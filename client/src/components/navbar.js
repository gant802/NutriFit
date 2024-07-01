import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SignedInContext } from "./App";

function Navbar() {
    const [signedIn] = useContext(SignedInContext);
    return (
        <div id="navbarCont">
            <div id="websiteNameLogoCont">
                <div>
                    <NavLink id="websiteName" to="/">NutriFit</NavLink>
                    <img id="nutrifitLogo" src={process.env.PUBLIC_URL + '/45075620.jpg'} alt="nutrifit logo" />
                </div>
                <input id="userSearchBar"placeholder="Search Users..." />
            </div>
            <div id="navbarButtonsCont">
                <NavLink className="navButtons" to='/home'>Home</NavLink>
                <NavLink className="navButtons" to='/workoutsPage'>Workouts</NavLink>
                <NavLink className="navButtons" to='/nutrition'>Nutrition</NavLink>
                <NavLink className="navButtons" to={`/calendar/${signedIn.id}`}>Calendar</NavLink>
                {signedIn ? <NavLink className="navButtons" to={`/userProfile/${signedIn.id}`}>My Profile</NavLink> : <NavLink className="navButtons" to='/loginOrCreate'>Login</NavLink>}
            </div>


        </div>
    )
}

export default Navbar