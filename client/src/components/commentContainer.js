import React from "react";
import CommentNode from "./commentNode";
import { Formik } from "formik";
import * as yup from 'yup';

function CommentContainer({comments, setComments, signedIn, post}){


    function handlePostComment(values){
        fetch(`/comments/${post.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        }).then(res => {
            if(res.ok){
                res.json().then(data => setComments([...comments, data]))
            }
        }).catch(error => console.log(error))
    }

    const commentsListed = comments.map(comment => {
        return <CommentNode key={comment.id} comment={comment} />
    })

    // Schema to validate the comment you want to post
    const commentSchema = yup.object().shape({
        comment: yup.string().max(100, 'Character limit reached!').required("Comment can't be blank!")
    })

    return(
        <div className="allCommentsContainer">
            <div className="newCommentFormCont">
                <Formik
                    initialValues={{
                        comment: ""
                    }}
                    validationSchema={commentSchema}
                    onSubmit={handlePostComment}
                >
                    {(props) => {
                        const { values: { comment }, handleChange, handleSubmit, errors } = props
                        return (<form className="commentForm" onSubmit={handleSubmit}>
                            <textarea onChange={handleChange} value={comment}
                                type="text" name="comment" />
                            {errors.comment}
                            <div>
                                <button className="addCommentButton" type="submit">Add Comment</button>
                            </div>
                        </form>)
                    }}
                </Formik>
            </div>
             <div className="commentsListedCont">
                {commentsListed}
             </div>
        </div>
    )
}

export default CommentContainer