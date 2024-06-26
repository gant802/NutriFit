import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SignedInContext } from "./App";

function Navbar() {
    const [signedIn] = useContext(SignedInContext);
    return (
        <div id="navbarCont">
            <div id="websiteNameLogoCont">
                <NavLink to="/">NutriFit</NavLink>
            </div>
            <div id="navbarButtonsCont">
                <NavLink to='/home'>Home</NavLink>
                <NavLink to='/workoutsPage'>Workouts</NavLink>
                <NavLink to='/nutrition'>Nutrition</NavLink>
                <NavLink to={`/calendar/${signedIn.id}`}>Calendar</NavLink>
                {signedIn ? <NavLink to={`/userProfile/${signedIn.id}`}>My Profile</NavLink> : <NavLink to='/loginOrCreate'>Login</NavLink>}
            </div>


        </div>
    )
}

export default Navbar