import React from "react";
import { Link } from "react-router-dom";

function CommentNode({ comment }) {
    return (
        <div className="singleCommentCont">

            <div className="commentUsernameCont">
                <Link to={`/userProfile/${comment.user.id}`} className="commentUsername">@{comment.user.username}</Link>
                <p>{comment.created_at.slice(0, 11)}</p>
            </div>

            <div>
                <p className="commentText">{comment.comment}</p>
            </div>

        </div>
    )
}

export default CommentNode