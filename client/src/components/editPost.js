import React from "react";
import { Formik } from "formik";
import * as yup from 'yup';

function EditPost({ post, saveEdit }) {

    // Schema to validate the post you are editing
    const editPostSchema = yup.object().shape({
        content: yup.string().max(150, 'Character limit reached!').required()
    })

    return (
        <div className="editPostFormCont">
            <Formik
                initialValues={{
                    content: post.content,
                }}
                validationSchema={editPostSchema}
                onSubmit={saveEdit}
            >
                {(props) => {
                    const { values: { content }, handleChange, handleSubmit, errors } = props
                    return (<form className="editPostForm" onSubmit={handleSubmit}>
                        <textarea onChange={handleChange} value={content}
                            type="text" name="content" />
                        <span>
                            <button type="submit">Save</button>
                        </span>
                    </form>)
                }}
            </Formik>
        </div>
    )
}

export default EditPost