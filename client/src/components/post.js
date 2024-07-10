import React, { useEffect, useState, useContext } from "react";
import { SignedInContext } from "./App";
import { Link } from "react-router-dom";
import CommentContainer from "./commentContainer";
import ToggleEditDelete from "./toggleEditDelete";
import EditPost from "./editPost";

function Post({ post, updatePostsState, deletePostFromState }) {
    const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(post.likes)
    const [signedIn] = useContext(SignedInContext)
    const [toggleComments, setToggleComments] = useState(false)
    const [toggleEditDelete, setToggleEditDelete] = useState(false)
    const [editPost, setEditPost] = useState(false)
    const [comments, setComments] = useState([])


    // Checks if the signed in user liked the post and sets the comments for the post
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

    //? Logic to  like and unlike a post
    function likeUnlikePost() {

        //!For unliking a post
        if (isLiked) {
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
        }

        //! For liking a post
        else {

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

    //? Logic to handle editing posts and updating state
    function savePostEdit(values){
        fetch(`/api/post/${post.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(res => {
            if(res.ok){
                res.json().then(data => {
                    updatePostsState(data)
                    setEditPost(!editPost)
                    setToggleEditDelete(!toggleEditDelete)
                })
            }
        })
    }

    //? Logic to handle deleting posts and updating state
    function deletePost(){
        fetch(`/api/post/${post.id}`, {
            method: 'DELETE'
        }).then(res => {
            if(res.ok){
                deletePostFromState(post)
            }
        })
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
                        {editPost ? <EditPost post={post} saveEdit={savePostEdit} /> : <p>{post.content}</p>}
                    </div>
                    <div className="postTextBottom">
                        {isLiked
                            ? <p className="likeButton" onClick={() => likeUnlikePost()}>❤️{likes}</p>
                            : <p className="likeButton" onClick={() => likeUnlikePost()}>🤍{likes}</p>}
                        <p className="toggleCommentsClick" onClick={() => setToggleComments(!toggleComments)}>{toggleComments ? "Hide Comments" : "Show Comments"}</p>
                        {post.user.id === signedIn.id
                            ? <ToggleEditDelete deletePost={deletePost} toggleEditDelete={toggleEditDelete} setToggleEditDelete={setToggleEditDelete} editPost={editPost} setEditPost={setEditPost} />
                            : null}

                    </div>
                </div>

            </div>

            {toggleComments ? <CommentContainer post={post} comments={comments} setComments={setComments} /> : null}
            <div className="lineBreak"></div>
        </>

    )
}

export default Post