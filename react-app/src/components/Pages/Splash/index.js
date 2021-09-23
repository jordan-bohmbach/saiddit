import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import CreatePostForm from "../../Forms/CreatePost";
import PostTile from "../../PostTile";
import SubsaidditList from "../../SubsaidditList";
import { useHistory } from "react-router";

import './Splash.css'

const Splash = () => {
    const posts = useSelector(state=>Object.values(state.posts))
    const user = useSelector(state=> state.session.user)
    const history = useHistory()


    return (
        <div className='splash-page-container'>
            <div className='post-list-container'>
            { user ? <CreatePostForm /> : ''}
                {
                    posts.map(post => (
                        <Link key={post.id} to={`/posts/${post.id}`}>
                            <PostTile post={post}/>
                        </Link>
                    ))
                }
            </div>
            <div className='side-lists-container'>
                <SubsaidditList />

                <div className='side-home-tile'>
                    <h1>Home</h1>
                    <p>Your personal Saiddit frontpage. Come here to check in with your favorite communities</p>
                    <button onClick={()=>history.push('/posts/new')}>Create Post</button>
                    <button onClick={()=>history.push('/subsaiddits/new')}>Create Community</button>
                </div>

                <div className='side-recent-posts-container'>
                    <h2>Recent Posts</h2>
                    {posts.map(post => (
                        <div key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                        </div>
                    ))}
                </div>

                <div className='side-links-container'>
                    <Link to='/help'>Help</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/coins'>Saiddit Coins</Link>
                    <Link to='/gifts'>Saiddit Gifts</Link>
                    <Link to='/careers'>Careers</Link>
                    <Link to='/blog'>Blog</Link>
                </div>
            </div>
        </div>
    )
}

export default Splash