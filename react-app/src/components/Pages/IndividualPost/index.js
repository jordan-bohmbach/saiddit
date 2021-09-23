import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import PostTile from '../../PostTile'
import './IndividualPost.css'

const IndividualPost = () => {
    const history=useHistory()
    const {postId} = useParams()
    const postList = useSelector(state=>Object.values(state.posts))
    const post = postList?.filter(post=>post.id === parseInt(postId))[0]
    if(!post){
        history.push('/')
    }

    return(
        <PostTile post={post} />
    )
}

export default IndividualPost