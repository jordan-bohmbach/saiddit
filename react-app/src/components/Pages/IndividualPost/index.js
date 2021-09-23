import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import PostTile from '../../PostTile'
import './IndividualPost.css'

const IndividualPost = () => {
    const {postId} = useParams()
    const postList = useSelector(state=>Object.values(state.posts))
    console.log('postList = ', postList)
    const post = postList?.filter(post=>post.id === parseInt(postId))[0]

    return(
        <PostTile post={post} />
    )
}

export default IndividualPost