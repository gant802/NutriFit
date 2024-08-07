import React from "react";
import Post from "./post";

function PostsContainer({ posts, setPosts }) {
    let postsListed

    //? Logic to handle state of posts after editing one
    function handleEditedPostState(postData){
        const updatedPosts = posts.map(post => {
            if (post.id === postData.id) {
                return postData
            }
            return post
           })
       return setPosts(updatedPosts)
    }

    //? Logic to handle state of posts after deleting one
    function deletePostFromState(deletedPost){
        const updatedPosts = posts.filter(post => post.id !== deletedPost.id)
        return setPosts(updatedPosts)
    }
    

    // Passes all posts into a Post component and lists them
        postsListed = posts.map(post => {
        return <Post key={post.id} deletePostFromState={deletePostFromState} updatePostsState={handleEditedPostState} post={post} />
    })

    


    return (
        <div id="allPostsCont">
            {postsListed.reverse()}
        </div>
    )
}

export default PostsContainer