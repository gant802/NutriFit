import React from "react";
import { useNavigate } from "react-router-dom";

function UserInfo({logout, user, signedInUser, isFollowing, setIsFollowing}){
    const navigate = useNavigate();

    function goToEditProfile(){
        navigate(`/editprofile/${signedInUser.id}`);
    }

    function handleFollowOrUnfollow(){
        if (isFollowing){
            fetch(`/unfollow/${user.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res => {
                if (res.ok){
                    setIsFollowing(false)
                }
            })
        } else {
            fetch('/following', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({user_id: user.id})
            }).then(res => {
                if (res.ok){
                    res.json().then(res => setIsFollowing(true))
                }
            })

        }
    }


    return(
        <div id="userInfoCont">
            <div id="userInfoUpper">
                <img className="userProfilePhoto" src={user.image_url} alt="profile image"/>
                <p id="userFullNameText">{user.first_name} {user.last_name}</p>
                <p id="userUsernameText">@{user.username}</p>
                {user.id === signedInUser.id 
                ? <button id="logoutButton" onClick={logout}>Logout</button> 
                : <button onClick={handleFollowOrUnfollow} id="followButton">{isFollowing ? "Following" : "Follow"}</button>}
                {user.id === signedInUser.id 
                ? <button id="editProfileButton" onClick={goToEditProfile}>Edit Profile</button> 
                : null}
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