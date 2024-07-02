import React from "react";
import { useNavigate } from "react-router-dom";

function UserInfo({logout, user, signedInUser}){
    const navigate = useNavigate();

    function goToEditProfile(){
        navigate(`/editprofile/${signedInUser.id}`);
    }

    return(
        <div id="userInfoCont">
            <img id="userProfilePhoto" src={user.image_url} alt="profile image"/>
                <p>{user.first_name} {user.last_name}</p>
                <p>@{user.username}</p>
                {user.id === signedInUser.id ? <button onClick={logout}>Logout</button> : <button>Follow</button>}
                {user.id === signedInUser.id ? <button onClick={goToEditProfile}>Edit Profile</button> : null}
                
            </div>
    )
}

export default UserInfo