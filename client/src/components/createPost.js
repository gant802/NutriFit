import React,{useContext} from "react";
import { Formik } from "formik";
import * as yup from 'yup';
import { SignedInContext } from "./App";

function CreatePost({ setPosts, posts }) {
    const [signedIn] = useContext(SignedInContext);

    //? Function to handle creating a post that persists
    function handlePostSubmit(values) {
        fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(resp => {
            if (resp.ok) {
                resp.json().then(data => setPosts([data, ...posts]))
            }
        }).catch(error => console.log(error))
    }

    // Schema to validate new post
    let createPostSchema = yup.object().shape({
        content: yup.string().max(150, 'Character limit reached!').required()
    })

    return (
        <div id="createPostContainer">
            <h2>What's on your mind?</h2>

            <Formik
                initialValues={{
                    content: "",
                    user_id: signedIn.id
                }}
                validationSchema={createPostSchema}
                onSubmit={handlePostSubmit}
            >
                {(props) => {
                    const { values: { content }, handleChange, handleSubmit, errors } = props
                    return (<form id="createPostForm" onSubmit={handleSubmit}>
                        <textarea id="postInput" onChange={handleChange} value={content}
                            type="text" name="content" placeholder="Who wants to get a lift in?..." />
                        <div>
                            <button id="createPostButton" type="submit">Create Post</button>
                        </div>
                    </form>)
                }}
            </Formik>
            
        </div>
    )
}

export default CreatePost