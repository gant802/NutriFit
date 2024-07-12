import React, { useContext, useState, useEffect } from "react";
import { SignedInContext } from "../components/App";
import { useNavigate, useParams } from "react-router-dom";
import WorkoutNode from "../components/workoutNode";
import UserInfo from "../components/userInfo";
import PostsContainer from "../components/postsContainer";

function UserProfile() {
    const [signedIn, setSignedIn] = useContext(SignedInContext)
    const [userWorkouts, setUserWorkouts] = useState([])
    const [posts, setPosts] = useState([])
    const [profileOfUser, setProfileOfUser] = useState({})
    const [seeWorkouts, setSeeWorkouts] = useState(true)
    const [isFollowing, setIsFollowing] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    let workoutsListed;

    // Retreives user info, workouts and posts by the user on the profile the page is on depending on the params id
    useEffect(() => {
        fetch(`/user_workouts/${id}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => setUserWorkouts(() => data))
                }
            }).catch(error => console.log(error))

        fetch(`/users/${id}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => setProfileOfUser(data))
                }
            }).catch(error => console.log(error))

        fetch(`/posts/user/${id}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => setPosts(data))
                }
            }).catch(error => console.log(error))

            fetch('/following')
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        const isUserFollowing = data.some(followRel => followRel.id == id);
                        console.log("Line 44 in user profile")
                        setIsFollowing(isUserFollowing);
                    })
                }
            })



    }, [id])


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

    // Lists out the user's workouts that the web page is on
    if (userWorkouts) {
        workoutsListed = userWorkouts.map(workout => {
            return <WorkoutNode signedIn={signedIn} key={workout.id} workout={workout.workout} setUserWorkouts={setUserWorkouts} userWorkouts={userWorkouts} />
        })
    }



    return (
        <div id="userProfileCont">

            <UserInfo user={profileOfUser} logout={logout} signedInUser={signedIn} isFollowing={isFollowing} setIsFollowing={setIsFollowing} />

            <div id="userContentCont">
                <div id="userWorkoutsPostsTitleCont">
                    <h2 className="userWorkoutsPostsTitle" onClick={() => setSeeWorkouts(true)}>Workouts</h2>
                    <h2 className="userWorkoutsPostsTitle" onClick={() => setSeeWorkouts(false)}>Posts</h2>
                </div>
                <div id="userWorkoutsPostsCont">
                    {seeWorkouts ? workoutsListed : <PostsContainer posts={posts} setPosts={setPosts} />}
                </div>
            </div>

        </div>
    )
}

export default UserProfile