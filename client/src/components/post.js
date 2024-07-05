import React, { useEffect, useState, useContext } from "react";
import { SignedInContext } from "./App";

function Post({ post }) {
    const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(post.likes)
    const [signedIn] = useContext(SignedInContext)

    useEffect(() => {
        fetch(`/liked_post/${signedIn.id}/${post.id}`)
            .then(res => {
                if (res.ok) {
                    setIsLiked(true)
                }
            })
    }, [])

    function likeUnlikePost() {
        if (isLiked) {
            // First, update the like count in the state
            setLikes(prevLikes => prevLikes - 1);
    
            fetch(`/liked_post/${signedIn.id}/${post.id}`, {
                method: "DELETE"
            }).then(resp => setIsLiked(false))
    
            let newLikeCount = post.likes - 1;
            fetch(`/api/post/${post.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    likes: newLikeCount
                })
            }).then(resp => {
                if (resp.ok) {
                    resp.json().then(data => data);
                }
            });
        } else {
            // First, update the like count in the state
            setLikes(prevLikes => prevLikes + 1);
    
            fetch(`/liked_post/${signedIn.id}/${post.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: signedIn.id,
                    liked_post_id: post.id
                })
            }).then(resp => {
                if (resp.ok) {
                    setIsLiked(true)
                }
            })
    
            let newLikeCount = post.likes + 1;
            fetch(`/api/post/${post.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    likes: newLikeCount
                })
            }).then(resp => {
                if (resp.ok) {
                    resp.json().then(data => data);
                }
            });
        }
    }


    return (
        <div className="singlePostCont">
            <p>{post.user.username}</p>
            <p>{post.content}</p>
            {isLiked
                ? <p onClick={() => likeUnlikePost()}>❤️{likes}</p>
                : <p onClick={() => likeUnlikePost()}>🤍{likes}</p>}
        </div>
    )
}

export default Post