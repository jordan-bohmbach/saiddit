import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createOneComment, getComments, updateComment } from "../../../store/comment"
import { useParams } from "react-router"

import './CreateComment.css'

const CreateCommentForm = ({ parentId, updateingId, setEditing = (editing) => editing = false, editing = false, setTypeing = (typeing) => typeing= false, typeing = false}) => {
    const { postId } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    // console.log('updateingId = ', updateingId)
    let myComment = useSelector(state=> Object.values(state.comments).filter(comment=>comment.id === updateingId))[0]

    const [content, setContent] = useState('')

    const reset = (e) => {
        if(e){
            e.preventDefault()
        }
        setEditing(false)
        setTypeing(false)
        setContent('')
    }

    useEffect(()=>{
        if(editing){
            setContent(myComment?.content)
        }
    },[editing, myComment])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(content === '') return

        
        if(!editing) {
            const payload = {
                userId : user?.id,
                postId,
                parentId,
                content,
                createdat: new Date(),
                updatedat: new Date()
            }

            let createdPost = await dispatch(createOneComment(payload))
            if (createdPost) {
                getComments()
            }
        }
        setTypeing(false)

        if(editing) {
            // console.log('here in the react element, dispatching an updateCommment myComment : ', myComment)

            const payload = {
                id: myComment?.id,
                user_id : user?.id,
                post_id : postId,
                parent_id : myComment?.parent_id,
                content,
                createdat: new Date(),
                updatedat: new Date()
            }

            let updatedComment = await dispatch(updateComment(payload))
            if(updatedComment){
                getComments()
            }
        }
        setEditing(false)
        reset()
    }

    return (
        <div className='create-comment-form-container'>
            <form
                className='create-comment-form'
            >
                <h3 className='new-comment'>{editing ? `Update Comment as ${user?.username}` : `Comment as ${user?.username}`}</h3>

                <label className={'new-comment-input'}></label>
                <textarea
                    placeholder='What are your thoughts?'
                    type='text'
                    name='content'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />


                <div className='comment-form-buttons'>
                    <button
                        className="new-comment-submit"
                        onClick={handleSubmit}
                    >
                        {editing ? 'Update' : 'Comment'}
                    </button>
                    <button
                        onClick={reset}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateCommentForm
