import { useSelector } from "react-redux"
import { useParams } from "react-router"
import PostTile from "../../PostTile"

const IndividualSubsaiddit = () => {
    const { subsaidditName} = useParams()
    const subsaidditList = useSelector(state=>Object.values(state.subsaiddits))
    const subsaidditId = subsaidditList.filter(subsaiddit=> subsaiddit.name === subsaidditName)[0]?.id
    const allPosts = useSelector(state=>Object.values(state.posts))
    const subsaidditPosts = allPosts.filter(post=>post.subsaiddit_id === subsaidditId)

    return (
        <>
            <h1>{`${subsaidditName} page`}</h1>
            {subsaidditPosts.map(post=> (
                <PostTile post={post} />
            ))}
        </>
    )
}

export default IndividualSubsaiddit