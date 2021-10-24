import './CommentTile.css'
import { updateComment } from '../../store/comment'
import { useDispatch } from 'react-redux'
import CreateCommentForm from '../Forms/CreateComment'
import { getComments } from '../../store/comment'
import { useState } from 'react'

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


const CommentTile = ({comment}) => {
    const dispatch = useDispatch()
    const [editing, setEditing] = useState(false)

    let timeDifference
    if (process.env.NODE_ENV === 'production') {
        timeDifference = (new Date() - Date.parse(comment.createdat))
    } else {
        timeDifference = (new Date() - Date.parse(comment.createdat)) - 18000000
    }

    const handleDelete = async (e) => {
        // dispatch(deleteComment(e.target.value))
        const payload = {
            id : comment.id,
            user_id: 2,
            post_id : comment.post_id,
            parent_id : comment.parent_id,
            content: 'Deleted',
            createdat: comment.createdat,
            updatedat: new Date()
        }

        let updatedComment = await dispatch(updateComment(payload))
        if (updatedComment) {
            getComments()
        }
    }

    const handleEdit = (e) => {
        setEditing(true)
    }


    return (
        <>
            <div>Commented {getTimeString(timeDifference)}</div>
            <h3>{comment.content}</h3>
            <div className='individual-comment-buttons-container'>
            <button value={comment.id} onClick={handleDelete}>Delete</button>
            <button value={comment.id} onClick={handleEdit}>Edit</button>
            {editing ? <CreateCommentForm editing={editing} setEditing={setEditing} updateingId={comment.id} /> : ''}
            </div>
        </>
    )
}

export default CommentTile