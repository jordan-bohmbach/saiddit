import { useDispatch, useSelector } from 'react-redux'
import './PostTile.css'
import { deletePost } from '../../store/post'
import { useHistory } from 'react-router'

const PostTile = ({post}) => {
    const userId = useSelector(state=>state.session.user?.id)
    const dispatch = useDispatch()
    const history = useHistory()


    return(
        <div className='post-tile-container'>
            <h1>{post.title}</h1>
            <img src={post.image} alt='post img not found'></img>
            <h2>{post.content}</h2>
            <h2>Owner Id : {post.owner_id}</h2>
            <h2>Subsaiddit Id : {post.subsaiddit_id}</h2>
            <h2>{post.createdat}</h2>
        </div>
    )
}

export default PostTile