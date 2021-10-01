import { useSelector } from 'react-redux'
import './PostTile.css'
import '../Style/Style.css'

const PostTile = ({post}) => {

    const subsaidditList = useSelector(state=>Object.values(state.subsaiddits))
    const postsSubsaiddit = subsaidditList.filter(subsaiddit=>subsaiddit.id === post.subsaiddit_id)[0]
    const userList = useSelector(state=>Object.values(state.users))
    const postsOwner = userList.filter(user=>user.id === post.owner_id)[0]


    let timeDifference
    if (process.env.NODE_ENV === 'production'){
        timeDifference = (new Date() - Date.parse(post?.createdat))
    } else {
        timeDifference = (new Date() - Date.parse(post?.createdat)) - 18000000
    }

    const daysDifference = Math.floor(timeDifference / 86400000)
    const hoursDifference = Math.floor((timeDifference % 86400000) / 3600000)
    const minutesDifference = Math.round(((timeDifference % 86400000) % 3600000) / 60000)   
    
    const getTimeString = () => {
        let timeDifferenceString = ''
        if(daysDifference > 0) {
            if(daysDifference === 1){
                timeDifferenceString += `${daysDifference} Day`
            } else {
                timeDifferenceString += `${daysDifference} Days`
            }
        }
        if(hoursDifference > 0) {
            if(hoursDifference === 1){
                timeDifferenceString += ` ${hoursDifference} Hour`
            } else {
                timeDifferenceString += ` ${hoursDifference} Hours`
            }
        }
        if(minutesDifference > 0) {
            if(minutesDifference === 1){
                timeDifferenceString += ` ${minutesDifference} Minute`
            } else {
                timeDifferenceString += ` ${minutesDifference} Minutes`
            }
        }
        if(minutesDifference === 0 && daysDifference === 0 && hoursDifference === 0 ){
            timeDifferenceString += 'Less than a Minute '
        }
        return '- ' + timeDifferenceString + ' Ago'
    }

    return(
        <div className='post-tile-container'>
            <div className='post-tile-header'>
                <img src={postsSubsaiddit?.image} alt='post subsaiddit not found'></img>
                <p>{`s/${postsSubsaiddit?.name} - Posted by u/${postsOwner?.username} ` + getTimeString()}</p>
            </div>
            <h2>{post?.title}</h2>
            <p>{post?.content}</p>
            <div className='post-tile-image-container'>
                <img src={post?.image} alt='post img not found'></img>
            </div>
        </div>
    )
}

export default PostTile