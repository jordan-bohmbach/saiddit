import { useDispatch, useSelector } from "react-redux"
import CreatePostForm from "../../Forms/CreatePost";
import PostTile from "../../PostTile";
import SubsaidditList from "../../SubsaidditList";
import { useHistory } from "react-router";
import { deletePost } from "../../../store/post";

import '../../Style/Style.css'
import './Splash.css'

const Splash = () => {
    const dispatch = useDispatch()
    let posts = useSelector(state=>Object.values(state.posts))
    const subsaidditList = useSelector(state=>Object.values(state.subsaiddits))
    const topSubsaidditList = subsaidditList.slice(0, 5)
    posts.sort((a, b)=>b.id - a.id);
    const user = useSelector(state=> state.session.user)
    const history = useHistory()
    
    const handlePostEdit = (e) => {
        history.push(`/posts/${e.target.value}/edit`)
    }

    const handlePostDelete = (e) => {
        dispatch(deletePost(e.target.value))
    }

    return (
        <div className='splash-page-container'>
            <div className='post-list-container'>
            { user ? <CreatePostForm size={'small'}/> : ''}
            {
                posts.map(post => (
                    <div className='outer-post-container' key={post.id}>
                        {/* <Link className='post-tile-container-link' key={post.id} to={`/posts/${post.id}`}> */}
                        <PostTile post={post}/>
                        {/* </Link> */}
                        {/* <div className='post-interaction-button-container'>
                            <div className='post-interaction-button'>
                                <i className="far fa-comment-dots"></i>
                                <p>Comments</p>
                            </div>
                            <div className='post-interaction-button'>
                                <i className="fas fa-gift"></i>
                                <p>Gift</p>
                            </div>
                            <div className='post-interaction-button'>
                                <i className="fas fa-share"></i>
                                <p>Share</p>
                            </div>
                        </div> */}
                        <div className='post-modification-buttons'>
                            {user?.id === post.owner_id ? <button value={post.id} onClick={handlePostEdit}>Edit Post</button> : ''}
                            {user?.id === post.owner_id ? <button value={post.id} onClick={handlePostDelete}>Delete Post</button> : ''}
                        </div>
                    </div>
                ))
            }
            </div>
            <div className='side-lists-container'>
                <SubsaidditList subsaiddits={topSubsaidditList} header={'Top Communities'}/>

                <div className='side-home-tile'>
                    <h1>Home</h1>
                    <p>Your personal Saiddit frontpage. Come here to check in with your favorite communities</p>
                    <div className='side-home-tile-buttons'>
                        <button onClick={()=>history.push('/posts/new')}>Create Post</button>
                        <button onClick={()=>history.push('/subsaiddits/new')}>Create Community</button>
                    </div>
                </div>

                <div className='side-recent-posts-container'>
                    <h2>Recent Posts</h2>
                    {posts.slice(0, 5).map(post => (
                        <div key={post.id} className='sidebar-recent-posts-list'>
                            {/* <h3><Link to={`/posts/${post.id}`}>{post.title}</Link></h3> */}
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                        </div>
                    ))}
                </div>

                {/* <SideLinksContainer /> */}
            </div>
        </div>
    )
}

export default Splash