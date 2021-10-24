import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateCommentForm from '../Forms/CreateComment'
import { updateComment } from '../../store/comment'
import { getComments } from '../../store/comment'
import './RecursiveComment.scss'
import './RecursiveComment.css'
import { Link } from 'react-router-dom'

const getTimeString = (timeDifference) => {
    const daysDifference = Math.floor(timeDifference / 86400000)
    const hoursDifference = Math.floor((timeDifference % 86400000) / 3600000)
    const minutesDifference = Math.round(((timeDifference % 86400000) % 3600000) / 60000)

    let timeDifferenceString = ''
    if (daysDifference > 0) {
        if (daysDifference === 1) {
            timeDifferenceString += `${daysDifference} Day`
        } else {
            timeDifferenceString += `${daysDifference} Days`
        }
    }
    if (hoursDifference > 0) {
        if (hoursDifference === 1) {
            timeDifferenceString += ` ${hoursDifference} Hour`
        } else {
            timeDifferenceString += ` ${hoursDifference} Hours`
        }
    }
    if (minutesDifference > 0) {
        if (minutesDifference === 1) {
            timeDifferenceString += ` ${minutesDifference} Minute`
        } else {
            timeDifferenceString += ` ${minutesDifference} Minutes`
        }
    }
    if (minutesDifference === 0 && daysDifference === 0 && hoursDifference === 0) {
        timeDifferenceString += 'Less than a Minute '
    }
    return '- ' + timeDifferenceString + ' Ago'
}

const RecursiveComment = ({ level, content, id, parent_id, children, user_id, createdat, post_id }) => {
    const [typeing, setTypeing] = useState(false)
    const [editing, setEditing] = useState(false)
    // const hasChildren = children && children.length
    const user = useSelector(state=>state.session.user)
    const dispatch = useDispatch()
    const commentPoster = useSelector(state=>Object.values(state.users).filter(user=>user.id === user_id)[0])
    
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
        // dispatch(deleteComment(e.target.value))
        const payload = {
            id,
            user_id: 2,
            post_id,
            parent_id,
            content: 'Deleted',
            createdat: new Date(),
            updatedat: new Date()
        }

        let updatedComment = await dispatch(updateComment(payload))
        if (updatedComment) {
            getComments()
        }
    }

    const handleEdit = (e) => {
        setTypeing(false)
        setEditing(true)
    }

    let timeDifference
    if (process.env.NODE_ENV === 'production') {
        timeDifference = (new Date() - Date.parse(createdat))
    } else {
        timeDifference = (new Date() - Date.parse(createdat)) - 18000000
    }

    return (
        <div className={`nested-comment-level-${level} individual-comment-container`}>
            {(!editing) && (user_id !==2) ? <div>Commented by <Link to={`/users/${commentPoster.id}`}>u/{commentPoster.username}</Link>{getTimeString(timeDifference)}</div>: ''}
            {(!editing) && (user_id === 2) ? <div>Comment was deleted {getTimeString(timeDifference)}</div> : ''}
            {!editing ? <h3>{content}</h3> : ''}
            <div className='individual-comment-buttons-container'>
                {user && !editing ? <button value={id} onClick={handleReply}>Reply</button> : ''}
                {user?.id === user_id && !editing ? <button value={id} onClick={handleDelete}>Delete</button> : ''}
                {user?.id === user_id && !editing ? <button value={id} onClick={handleEdit}>Edit</button> : ''}
                {typeing? <CreateCommentForm setTypeing={setTypeing} typeing={typeing} editing={editing} setEditing={setEditing} parentId={id}/> : ''}
                {editing ? <CreateCommentForm setTypeing={setTypeing} typeing={typeing} editing={editing} setEditing={setEditing} updateingId={id}/> : ''}
            </div>
            {children && children.map((child) => (
                <div>
                    <RecursiveComment key={child.id} {...child} />
                </div>
            ))}
        </div>
    )
}

export default RecursiveComment