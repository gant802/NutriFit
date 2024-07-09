import React, { useEffect, useState, useContext } from "react";
import { SignedInContext } from "./App";
import { Link } from "react-router-dom";
import CommentContainer from "./commentContainer";

function Post({ post }) {
    const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(post.likes)
    const [signedIn] = useContext(SignedInContext)
    const [toggleComments, setToggleComments] = useState(false)
    const [comments, setComments] = useState([])


    useEffect(() => {
        fetch(`/liked_post/${signedIn.id}/${post.id}`)
            .then(res => {
                if (res.ok) {
                    setIsLiked(true)
                }
            })
        
        fetch(`/comments/${post.id}`)
        .then(res => {
            if (res.ok) {
                res.json().then(data => setComments(data))
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

            fetch(`/api/post_unliked/${post.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
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

            fetch(`/api/post_liked/${post.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(resp => {
                if (resp.ok) {
                    resp.json().then(data => data);
                }
            });
        }
    }

    const formattedCreatedAt = post.created_at.slice(0, 11)


    return (
        <>
        <div className="singlePostCont">
            <img src={post.user.image_url} className="profilePostImage" alt="profilePostImg" />
            <div className="postTextCont">
                <div className="postTextTop">
                    <Link to={`/userProfile/${post.user.id}`}>@{post.user.username}</Link>
                    <p>{formattedCreatedAt}</p>
                </div>
                <div className="postTextMiddle">
                    <p>{post.content}</p>
                </div>
                <div className="postTextBottom">
                    {isLiked
                    ? <p className="likeButton" onClick={() => likeUnlikePost()}>❤️{likes}</p>
                    : <p className="likeButton" onClick={() => likeUnlikePost()}>🤍{likes}</p>}
                    <p className="toggleCommentsClick" onClick={() => setToggleComments(!toggleComments)}>{toggleComments ? "Hide Comments" : "Show Comments"}</p>
                </div>
                  
            </div>
                  
        </div>
        {toggleComments ? <CommentContainer post={post} comments={comments} setComments={setComments} signedIn={signedIn} /> :  null}
        <div className="lineBreak"></div>
        </>
        
    )
}

export default Post