import React from "react";
import { Link } from "react-router-dom";

function UserNode({user, setSearchInput}){
    return(
        <div className="userNode">
            <div>
                <img className="userNodeImage" src={user.image_url} alt="user-profileimage"/>
            <Link onClick={() => setSearchInput("")} to={`/userProfile/${user.id}`}>@{user.username}</Link>
            </div>
        </div>
    )
}

export default UserNode