import { useSelector } from "react-redux"
import { useParams } from "react-router"
import PostTile from "../../PostTile"
import {Link} from 'react-router-dom'

import './IndividualSubsaiddit.css'

import Spicture from '../../../images/s-slash-picture.png'
import SideLinksContainer from "../../SideLinksContainer"

const IndividualSubsaiddit = () => {
    const { subsaidditName} = useParams()
    const subsaidditList = useSelector(state=>Object.values(state.subsaiddits))
    const subsaiddit = subsaidditList.filter(subsaiddit=> subsaiddit.name === subsaidditName)[0]
    const allPosts = useSelector(state=>Object.values(state.posts))
    const subsaidditPosts = allPosts.filter(post=>post.subsaiddit_id === subsaiddit?.id)

    const userList = useSelector(state=>Object.values(state.users))
    const moderator = userList.filter(user=>user.id === subsaiddit?.moderator_id)[0]

    return (
        <>
            <div className='individual-subsaiddit-banner-image' style={{'background-image': `url(${subsaiddit?.image})`}}></div>
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
                        <PostTile post={post} />
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
                    <SideLinksContainer />
                </div>
            </div>
        </>
    )
}

export default IndividualSubsaiddit