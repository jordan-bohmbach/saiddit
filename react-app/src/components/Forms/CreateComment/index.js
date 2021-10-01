import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createOneComment, getComments, updateComment } from "../../../store/comment"
import { useParams } from "react-router"

import './CreateComment.css'

const CreateCommentForm = ({parentId}) => {
    const { postId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const postList = useSelector(state => Object.values(state.posts))
    const post = postList.filter(post => post.id === parseInt(postId))[0]

    const [content, setContent] = useState('')
    const [editing, setEditing] = useState('')

    const reset = () => {
        setEditing(false)
        setContent('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(content === '') return

        const payload = {
            userId : user?.id,
            postId,
            parentId,
            content,
            createdat: new Date(),
            updatedat: new Date()
        }
        
        setEditing(false)
        let createdPost = await dispatch(createOneComment(payload))
        if (createdPost) {
            getComments()
        }
        reset()
    }

    return (
        <div className='create-comment-form-container'>
            <form
                className='create-comment-form'
                onSubmit={handleSubmit}
            >
                <h3 className='new-comment'>{editing ? `Update Comment as ${user?.username}` : `Comment as ${user?.username}`}</h3>
                <div className='new-comment-outer-container'>
                    <label className={'new-comment-input'}>
                        <textarea
                            placeholder='What are your thoughts?'
                            type='text'
                            name='content'
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                    </label>
                </div>
                <div className='comment-form-buttons'>
                    <button
                        className="new-comment-submit"
                        type="submit"
                    >
                        {editing ? 'Update' : 'Comment'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateCommentForm
