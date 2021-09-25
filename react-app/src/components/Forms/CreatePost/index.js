import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createOnePost, getPosts, updatePost } from "../../../store/post"
import { useParams } from "react-router"

import './CreatePost.css'

const CreatePostForm = () => {
    const {postId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionId = useSelector(state => state.session.user.id)
    const postList = useSelector(state=>Object.values(state.posts))
    const post = postList.filter(post=>post.id === parseInt(postId))[0]
    const subsaidditList = useSelector(state=>Object.values(state.subsaiddits))

    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [content, setContent] = useState('')
    const [subsaidditId, setSubsaidditId] = useState(1)
    const [editing, setEditing] = useState(false)

    const reset = () => {
        setTitle('')
        setContent('')
        setImage('')
        setSubsaidditId(subsaidditList[0].id)
    }

    useEffect(()=> {
        if(postId){
            setEditing(true)
            setTitle(post?.title)
            setContent(post?.content)
            setImage(post?.image)
        }
    },[postId, post])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if(!editing){
            //here we are creating a new post
            const payload = {
                title,
                content,
                image,
                ownerId : sessionId,
                subsaidditId,
                createdat: new Date(),
                updatedat: new Date()
            }
    
            let createdPost = await dispatch(createOnePost(payload))
            if (createdPost) {
                getPosts()
                reset()
                history.push('/')
            }
        } else {
            //here we are editing so we want to do a put request
            const payload = {
                id : post.id,
                title,
                content,
                image,
                ownerId : sessionId,
                subsaidditId,
                createdat : post.createdat,
                updatedat : new Date()
            }
            
            let updatedPost = await dispatch(updatePost(payload))
            if(updatedPost){
                getPosts()
                reset()
                history.push('/')
            }
        }

    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    return (
        <div className='create-post-form-container'>
            <form
                className='create-post-form'
                onSubmit={handleSubmit}
            >
                <h2 className='new-post'>{editing? 'Update Post Information': 'Create a new Post'}</h2>
                <label className='new-post-input'>
                    Title
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </label>
                <label className='new-post-input'>
                    Content
                    <input
                        type='text'
                        name='content'
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </label>
                <label className='new-post-input'>
                    <input type="file" onChange={updateFile} />
                </label>
                <label className='new-post-input'>
                    Subsaiddit
                    <select
                        value={subsaidditId}
                        onChange={e => setSubsaidditId(e.target.value)}
                    >
                    {subsaidditList.map(subsaiddit=>(
                            <option key={subsaiddit.id} value={subsaiddit.id}>{subsaiddit.name}</option>
                        ))}
                    </select>
                </label>
                <button
                    className="new-post-submit"
                    type="submit"
                >
                    {editing ? 'Update Post' : 'Create Post'}
                </button>
            </form>
            <div className='cancel-post-container'>
                <Link to='/' className='cancel-post-link' onClick={reset}>Cancel</Link>
            </div>
        </div>
    )
}

export default CreatePostForm
