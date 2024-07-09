import React, {useState, useEffect} from "react";
import PostsContainer from "../components/postsContainer";
import CreatePost from "../components/createPost";

function Home(){
    const [posts, setPosts] = useState([]);

    // Fetches all posts
    useEffect(() => {
        fetch('/posts')
        .then(res => res.json())
        .then(data => setPosts(data))
    }, [])

    return(
        <div id="homeCont">

            <CreatePost setPosts={setPosts} posts={posts}/>
            <PostsContainer posts={posts} setPosts={setPosts} />
            
        </div>
    )
}

export default Home