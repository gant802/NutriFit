import React, {useEffect, useState} from "react";
import Post from "./post";

function PostsContainer({setPosts, posts}){

    useEffect(() => {
        fetch('/posts')
        .then(res => res.json())
        .then(data => setPosts(data))
    }, [])

    const postsListed = posts.map(post => {
        return <Post key={post.id} post={post} />
    })

    console.log(posts)
    

    return(
        <div>
            {postsListed}
        </div>
    )
}

export default PostsContainer