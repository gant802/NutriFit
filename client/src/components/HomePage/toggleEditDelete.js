import React from "react";

function ToggleEditDelete({deletePost, setToggleEditDelete, toggleEditDelete, editPost, setEditPost}) {

    //? Logic to handle clicking on the three dots to show the edit and delete buttons
    function toggleDots(){
        setToggleEditDelete(!toggleEditDelete)
        setEditPost(false)
    }

    return (
        <div className="toggleEditDeleteCont">
            <p onClick={toggleDots}>...</p>
            {toggleEditDelete
                ? <div>
                    <button onClick={() => setEditPost(!editPost)}>Edit Post</button>
                    <button onClick={() => deletePost()}>Delete Post</button>
                </div>
                : null}
        </div>
    )
}

export default ToggleEditDelete;