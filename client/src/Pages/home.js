import React, {useState} from "react";
import PostsContainer from "../components/postsContainer";
import CreatePost from "../components/createPost";

function Home(){
    const [posts, setPosts] = useState([]);

    return(
        <div>
            <CreatePost setPosts={setPosts} posts={posts}/>
            <PostsContainer posts={posts} setPosts={setPosts} />
        </div>
    )
}

export default Home