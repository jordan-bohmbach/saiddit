import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import CreateCommentForm from '../../Forms/CreateComment'
import PostTile from '../../PostTile'
import { Link } from 'react-router-dom'
// import CommentsSection from '../../CommentsSection'
// import Comment from '../../CommentsSection/comment'
import './IndividualPost.css'
import RecursiveComment from '../../RecursiveComment.js'

const IndividualPost = () => {
    const history=useHistory()
    const {postId} = useParams()
    const postList = useSelector(state=>Object.values(state.posts))
    const post = postList?.filter(post=>post.id === parseInt(postId))[0]
    if(!post){
        history.push('/')
    }
    const subsaidditList = useSelector(state=>Object.values(state.subsaiddits))
    const subsaiddit = subsaidditList.filter(subsaiddit=>subsaiddit.id === post.subsaiddit_id)[0]
    const userList = useSelector(state => Object.values(state.users))
    const moderator = userList.filter(user => user.id === subsaiddit?.moderator_id)[0]

    let commentsList = useSelector(state=>Object.values(state.comments).filter(comment=>comment.post_id === post.id))
    console.log('post.id = ', post?.id)
    // commentsList.filter(comment=>comment.post_id === post.id)

    console.log('commentsList = ', commentsList)

    let hasNoChildren = (listItem, list) => {
        // console.log('listitem = ', listItem, ' list = ', list)
        for (let i = 0; i < list.length; i++) {
            if (list[i].parent_id === listItem.id) {
                // console.log('returning false')
                return false
            }
        }
        // console.log('returning true')
        return true
    }


    let getParentIndex = (listItem, list) => {

        if (listItem.parent_id === null) {
            return 'top-level'
        }

        for (let i = 0; i < list.length; i++) {
            // console.log('listitem.parent_id = ', listItem.parent_id, ' list[i].id = ', list[i].id)
            if (listItem.parent_id === list[i].id) {
                // console.log('returning ', i)
                return i
            }

        }
        return 'deleted-parent'

    }

    let isDone = (list) => {
        // console.log('list = ', list)
        let isDone = true
        list.forEach(item => {
            if (item.parent_id) {
                isDone = false
            }
        })
        return isDone
    }


    let commentListToManipulate = commentsList

    commentListToManipulate.forEach(comment => {
        comment.children = []
    })

    while (!isDone(commentListToManipulate)) {
        for (let i = 0; i < commentListToManipulate.length; i++) {
            let currentComment = commentListToManipulate[i]

            if (hasNoChildren(currentComment, commentListToManipulate)) {
                // console.log('i = ', i)
                let addIndex = getParentIndex(currentComment, commentListToManipulate)
                if (addIndex !== 'top-level' && addIndex !== 'deleted-parent') {
                    // console.log('addIndex = ', addIndex)
                    // if(!commentListToManipulate[addIndex.children]) commentListToManipulate[addIndex].children = []
                    commentListToManipulate[addIndex].children.push(currentComment)
                    commentListToManipulate.splice(i, 1)
                    i--
                    console.log('commentListToManipulate now equals ', commentListToManipulate)
                }

                if (addIndex === 'deleted-parent') {
                    commentListToManipulate.splice(i, 1)
                    i--
                    console.log('commentListToManipulate now equals ', commentListToManipulate)
                }
            }
        }
    }
    console.log(commentListToManipulate)

    return(
        <div className='individual-post-page-container'>
            <div className='individual-post-content-container'>
                <PostTile post={post} />
                <CreateCommentForm />
                <div className='comments-section-container'>
                    {commentListToManipulate.map(upperLevelComment=>(
                        <RecursiveComment {...upperLevelComment}/>
                    ))}
                </div>
            </div>
            <div className='individual-post-sidebar-container'>
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
    )
}

export default IndividualPost