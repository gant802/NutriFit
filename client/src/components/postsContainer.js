import React, {useEffect, useState} from "react";
import Post from "./post";

function PostsContainer({posts}){


    const postsListed = posts.map(post => {
        return <Post key={post.id} post={post} />
    })
    

    return(
        <div id="allPostsCont">
            {postsListed.reverse()}
        </div>
    )
}

export default PostsContainer