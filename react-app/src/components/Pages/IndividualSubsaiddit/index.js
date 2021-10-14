import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import PostTile from "../../PostTile"
import {Link} from 'react-router-dom'
import { deletePost } from "../../../store/post"

import './IndividualSubsaiddit.css'

import Spicture from '../../../images/s-slash-picture.png'

const IndividualSubsaiddit = () => {
    const { subsaidditName} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const subsaidditList = useSelector(state=>Object.values(state.subsaiddits))
    const subsaiddit = subsaidditList.filter(subsaiddit=> subsaiddit.name === subsaidditName)[0]
    const allPosts = useSelector(state=>Object.values(state.posts))
    const subsaidditPosts = allPosts.filter(post=>post.subsaiddit_id === subsaiddit?.id)
    const user = useSelector(state=>state.session.user)
    const allComments = useSelector(state=>Object.values(state.comments))

    const userList = useSelector(state=>Object.values(state.users))
    const moderator = userList.filter(user=>user.id === subsaiddit?.moderator_id)[0]

    const handlePostEdit = (e) => {
        history.push(`/posts/${e.target.value}/edit`)
    }

    const handlePostDelete = (e) => {
        dispatch(deletePost(e.target.value))
    }

    return (
        <div className='individual-subsaiddit-page-container'>
            <div className='individual-subsaiddit-banner-image' style={{'backgroundImage': `url(${subsaiddit?.image})`}}></div>
            <div className='individual-subsaiddit-banner-description'>
                <img src={Spicture} alt='subsaiddit logo' />
                <div>
                    <h1>{subsaiddit?.name}</h1>
                    <p className='faded-text'>{subsaiddit?.description}</p>
                </div>
            </div>
            <div className='subsaiddit-page-content-container'>
                <div className='subsaiddit-post-list-container'>
                    {subsaidditPosts.map(post=> (
                        <div className='outer-post-container' key={post.id}>
                            <Link className='post-tile-container-link' key={post.id} to={`/posts/${post.id}`}>
                                <PostTile post={post} />
                                <div className='post-interaction-button-container'>
                                    <div className='post-interaction-button'>
                                        <i className="far fa-comment-dots"></i>
                                        <p>{`${allComments.filter(comment=>comment.post_id === post.id).length}`} Comments</p>
                                    </div>
                                </div>
                            </Link>
                                <div className='post-modification-buttons'>
                                    {user?.id === post.owner_id ? <button value={post.id} onClick={handlePostEdit}>Edit Post</button> : ''}
                                    {user?.id === post.owner_id ? <button value={post.id} onClick={handlePostDelete}>Delete Post</button> : ''}
                                </div>
                        </div>
                    ))}
                </div>
                <div className='individual-subsaiddit-sidebar-container'>
                    <div className='individual-subsaiddit-rules-container'>
                        <h1>{`s/${subsaiddit?.name} Rules`}</h1>
                        <p>{subsaiddit?.rules}</p>
                    </div>
                    <div className='individual-subsaiddit-moderator-container'>
                        <h1>Moderator(s)</h1>
                        <Link to={`/users/${moderator?.id}`}>
                            <p>{`u/${moderator?.username}`}</p>
                        </Link>
                    </div>
                    {/* <SideLinksContainer /> */}
                </div>
            </div>
        </div>
    )
}

export default IndividualSubsaiddit