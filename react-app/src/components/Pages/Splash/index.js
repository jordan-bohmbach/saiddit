import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import PostTile from "../../PostTile";
import SubsaidditList from "../../SubsaidditList";

import './Splash.css'

const Splash = () => {
    const posts = useSelector(state=>Object.values(state.posts))
    console.log('posts', posts)

    return (
        <div className='splash-page-container'>
            <div className='post-list-container'>
                {
                    posts.map(post => (
                        <PostTile post={post}/>
                    ))
                }
            </div>
            <div className='side-lists-container'>
                <SubsaidditList />

                <div className='side-home-tile'>
                    <h1>Home</h1>
                    <p>Your personal Saiddit frontpage. Come here to check in with your favorite communities</p>
                    <button>Create Post</button>
                    <button>Create Community</button>
                </div>

                <div className='side-recent-posts-container'>
                    <h2>Recent Posts</h2>
                    {posts.map(post => (
                        <>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                        </>
                    ))}
                </div>

                <div className='side-links-container'>
                    <Link>Help</Link>
                    <Link>About</Link>
                    <Link>Saiddit Coins</Link>
                    <Link>Saiddit Gifts</Link>
                    <Link>Careers</Link>
                    <Link>Blog</Link>
                </div>
            </div>
        </div>
    )
}

export default Splash