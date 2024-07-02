import React from "react";
import { useNavigate } from "react-router-dom";

function UserInfo({logout, user, signedInUser}){
    const navigate = useNavigate();

    function goToEditProfile(){
        navigate(`/editprofile/${signedInUser.id}`);
    }

    return(
        <div id="userInfoCont">
            <div id="userInfoUpper">
                <img id="userProfilePhoto" src={user.image_url} alt="profile image"/>
                <p id="userFullNameText">{user.first_name} {user.last_name}</p>
                <p id="userUsernameText">@{user.username}</p>
                {user.id === signedInUser.id ? <button id="logoutButton" onClick={logout}>Logout</button> : <button>Follow</button>}
                {user.id === signedInUser.id ? <button id="editProfileButton" onClick={goToEditProfile}>Edit Profile</button> : null}
            </div>
            <div id="userInfoLower">
                <div id="userFollowCont">
                    <div>
                        <p>Followers</p>
                        <p className="followNum">0</p>
                    </div>
                    <div>
                        <p>Following</p>
                        <p className="followNum">0</p>
                    </div>
                </div>
                <div id="bioFavWorkoutCont">
                    <p>{user.bio}</p>
                {user.favorite_workout ? <p>Favorite Workout: {user.favorite_workout}</p> : ""}
                </div>
                
            </div>
                
            </div>
    )
}

export default UserInfo