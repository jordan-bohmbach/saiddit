import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createOnePost, getPosts, updatePost } from "../../../store/post"
import { useParams } from "react-router"
import { useRef } from "react"

import './CreatePost.css'

const CreatePostForm = ({size}) => {
    const ref = useRef()
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
    const [subsaidditId, setSubsaidditId] = useState(postId ? post?.subsaiddit_id : 1)
    const [editing, setEditing] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])

    const reset = () => {
        setTitle('')
        setContent('')
        let sizeReset = size
        document.getElementById('create-post-form').reset()
        size = sizeReset
        setImage('')
        setSubsaidditId(subsaidditList[0].id)
        history.push('/')
    }

    useEffect(()=>{
        const errors = []

        if(title?.length > 100) errors.push('Title should be 100 characters or less')
        if(!title?.length) errors.push('Title field is required')
        if(!image) errors.push('An image with the post is required')
        if(content?.length > 500) errors.push('Content should be 500 characters or less')

        setValidationErrors(errors)

    }, [title, image, content, subsaidditId])

    useEffect(()=> {
        if(postId){
            setEditing(true)
            setTitle(post?.title)
            setContent(post?.content)
            setSubsaidditId(post?.subsaiddit_id)
            setImage(post?.image)
            // console.log('ref = ', ref)
            // console.log('ref.current = ', ref.current)
            // console.log('ref.current.value = ', ref.current.value)
            // updateFile(ref.current.files)
            // console.log('here with post ', post, 'and value', subsaidditId, 'and image ', image)
            // console.log(image)
        }
    },[postId, post])

    const handleSubmit = async (e) => {
        console.log('in the handleSubmit, the image is ', image)

        e.preventDefault()

        if(validationErrors.length){
            return
        }
        
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
        // console.log('here updating the file')
        const file = e.target.files[0];
        // console.log('the file is, ', file)
        if (file) setImage(file);
    };

    return (
        <div className='create-post-form-container'>
            <form
                className='create-post-form'
                onSubmit={handleSubmit}
                id='create-post-form'
            >
                <h2 className='new-post'>{editing? 'Update Post Information': 'Create a new Post'}</h2>
                <ul className='post-creation-errors'>
                    {validationErrors.map(validationError=>(
                        <li key={validationError}>{validationError}</li>
                    ))}
                </ul>
                <div className='new-post-outer-container'>
                    <div className='new-post-left-container'>
                        <label className='new-post-input'>
                            <input
                                placeholder='Title'
                                type="text"
                                name="title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </label>
                        <label className={ size === 'small' ? 'new-post-input' : 'new-post-input big-new-post-input'}>
                            <textarea
                                placeholder='Text (Optional)'
                                type='text'
                                name='content'
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className='new-post-right-container'>
                        <label className='new-post-input'>
                            Image
                            <input type="file" onChange={updateFile} className='upload-file-input' ref={ref} id='file-input-string'/>
                        </label>
                        <label className='new-post-input'>
                            Subsaiddit
                            <select
                                value={subsaidditId}
                                onChange={e => setSubsaidditId(e.target.value)}
                                className='new-post-subsaiddit-selector'
                            >
                            {subsaidditList.map(subsaiddit=>(
                                    <option key={subsaiddit.id} value={subsaiddit.id}>{subsaiddit.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>
                <div className='post-form-buttons'>
                    <button
                        className='cancel-post-button'
                        onClick={reset}
                    >
                        Cancel
                    </button>
                    <button
                        className="new-post-submit"
                        type="submit"
                    >
                        {editing ? 'Update' : 'Post'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreatePostForm
