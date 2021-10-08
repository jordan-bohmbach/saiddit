import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateCommentForm from '../Forms/CreateComment'
import { deleteComment } from '../../store/comment'
import './RecursiveComment.scss'

const RecursiveComment = ({ level, content, id, parent_id, children, user_id }) => {
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
        setEditing(true)
    }

    const handleDelete = async (e) => {
        dispatch(deleteComment(e.target.value))
    }

    const handleEdit = (e) => {
        setEditing(true)
    }

    return (
        <div className={`nested-comment-level-${level}`}>
            {content}
            {user ? <button value={id} onClick={handleReply}>Reply</button> : ''}
            {user?.id === user_id ? <button value={id} onClick={handleDelete}>Delete</button> : ''}
            {user?.id === user_id ? <button value={id} onClick={handleEdit}>Edit</button> : ''}
            {editing? <CreateCommentForm setEditing={setEditing} editing={editing} parentId={id}/> : ''}

            {hasChildren && children.map((child) => (
                <div>
                    <RecursiveComment key={child.id} {...child} />
                </div>
            ))}
        </div>
    )
}

export default RecursiveComment