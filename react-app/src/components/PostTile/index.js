// import { useDispatch, useSelector } from 'react-redux'
import { useSelector } from 'react-redux'
import './PostTile.css'
// import { deletePost } from '../../store/post'
// import { useHistory } from 'react-router'

const PostTile = ({post}) => {
    // const userId = useSelector(state=>state.session.user?.id)
    // const dispatch = useDispatch()
    // const history = useHistory()
    const subsaidditList = useSelector(state=>Object.values(state.subsaiddits))
    const postsSubsaiddit = subsaidditList.filter(subsaiddit=>subsaiddit.id === post.subsaiddit_id)[0]
    const userList = useSelector(state=>Object.values(state.users))
    const postsOwner = userList.filter(user=>user.id === post.owner_id)[0]

    const timeDifference = new Date() - Date.parse(post.createdat)
    const daysDifference = Math.floor(timeDifference / 86400000)
    const hoursDifference = Math.floor((timeDifference % 86400000) / 3600000)
    const minutesDifference = Math.round(((timeDifference % 86400000) % 3600000) / 60000)
    
    const getTimeString = () => {
        let timeDifferenceString = ''
        if(daysDifference > 0) {
            timeDifferenceString += `${daysDifference} Day`
        }
        if(hoursDifference > 0) {
            timeDifferenceString += ` ${hoursDifference} Hours`
        }
        if(minutesDifference > 0) {
            timeDifferenceString += ` ${minutesDifference} Minutes`
        }
        return '- ' + timeDifferenceString + ' Ago'
    }

    return(
        <div className='post-tile-container'>
            <div className='post-tile-header'>
                <img src={postsSubsaiddit?.image} alt='post subsaiddit not found'></img>
                <p>{`/s/${postsSubsaiddit?.name} - Posted by u/${postsOwner?.username} ` + getTimeString()}</p>
            </div>
            <h1>{post.title}</h1>
            <h2>{post.content}</h2>
            <div className='post-tile-image-container'>
                <img src={post.image} alt='post img not found'></img>
            </div>
        </div>
    )
}

export default PostTile