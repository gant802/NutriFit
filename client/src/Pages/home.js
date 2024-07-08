import React, {useState, useEffect} from "react";
import PostsContainer from "../components/postsContainer";
import CreatePost from "../components/createPost";

function Home(){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('/posts')
        .then(res => res.json())
        .then(data => setPosts(data))
    }, [])

    return(
        <div>
            <CreatePost setPosts={setPosts} posts={posts}/>
            <PostsContainer posts={posts} setPosts={setPosts} />
        </div>
    )
}

export default Home