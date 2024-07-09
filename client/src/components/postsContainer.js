import React from "react";
import Post from "./post";

function PostsContainer({ posts }) {

    // Passes all posts into a Post component and lists them
    const postsListed = posts.map(post => {
        return <Post key={post.id} post={post} />
    })


    return (
        <div id="allPostsCont">
            {postsListed.reverse()}
        </div>
    )
}

export default PostsContainer