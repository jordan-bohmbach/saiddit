import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import CreateCommentForm from '../../Forms/CreateComment'
import PostTile from '../../PostTile'
import CommentsSection from '../../CommentsSection'
import Comment from '../../CommentsSection/comment'
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

    let commentsList = useSelector(state=>Object.values(state.comments).filter(comment=>comment.post_id === post.id))
    console.log('post.id = ', post.id)
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
        for (let i = 0; i < list.length; i++) {
            // console.log('listitem.parent_id = ', listItem.parent_id, ' list[i].id = ', list[i].id)
            if (listItem.parent_id === list[i].id) {
                // console.log('returning ', i)
                return i
            }
        }
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
                // console.log('addIndex = ', addIndex)
                // if(!commentListToManipulate[addIndex.children]) commentListToManipulate[addIndex].children = []
                commentListToManipulate[addIndex].children.push(currentComment)
                commentListToManipulate.splice(i, 1)
                i--
                console.log('commentListToManipulate now equals ', commentListToManipulate)
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
        </div>
    )
}

export default IndividualPost