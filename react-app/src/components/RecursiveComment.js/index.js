import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateCommentForm from '../Forms/CreateComment'
import { deleteComment } from '../../store/comment'
import './RecursiveComment.scss'

const RecursiveComment = ({ level, content, id, parent_id, children, user_id }) => {
    const [typeing, setTypeing] = useState(false)
    const [editing, setEditing] = useState(false)
    const hasChildren = children && children.length
    const user = useSelector(state=>state.session.user)
    const dispatch = useDispatch()
    
    console.log('children = ', children)

    children?.forEach(child=>{

        if (!level) {
            child.level = 1
        } else {
            child.level = level + 1
        }
    })

    const handleReply= (e) => {
        e.preventDefault()
        setEditing(false)
        setTypeing(true)
    }

    const handleDelete = async (e) => {
        dispatch(deleteComment(e.target.value))
    }

    const handleEdit = (e) => {
        setTypeing(false)
        setEditing(true)
    }

    return (
        <div className={`nested-comment-level-${level}`}>
            {editing ? '' : content}
            {user && !editing ? <button value={id} onClick={handleReply}>Reply</button> : ''}
            {user?.id === user_id && !editing ? <button value={id} onClick={handleDelete}>Delete</button> : ''}
            {user?.id === user_id && !editing ? <button value={id} onClick={handleEdit}>Edit</button> : ''}
            {typeing? <CreateCommentForm setTypeing={setTypeing} typeing={typeing} editing={editing} setEditing={setEditing} parentId={id}/> : ''}
            {editing ? <CreateCommentForm setTypeing={setTypeing} typeing={typeing} editing={editing} setEditing={setEditing} updateingId={id}/> : ''}

            {hasChildren && children.map((child) => (
                <div>
                    <RecursiveComment key={child.id} {...child} />
                </div>
            ))}
        </div>
    )
}

export default RecursiveComment