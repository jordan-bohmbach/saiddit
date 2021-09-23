import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createOnePost, getPosts } from "../../../store/post"

import './CreatePost.css'

const CreatePostForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionId = useSelector(state => state.session.user.id)

    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [content, setContent] = useState('')
    const [subsaidditId, setSubsaidditId] = useState(1)

    const reset = () => {
        setTitle('')
        setImage('')
        setSubsaidditId(0)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

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

    }

    return (
        <div className='create-post-form-container'>
            <form
                className='create-post-form'
                onSubmit={handleSubmit}
            >
                <h2 className='new-post'>Create a new Post</h2>
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
                    Image
                    <input
                        type='text'
                        name='image'
                        value={image}
                        onChange={e => setImage(e.target.value)}
                    />
                </label>
                <button
                    className="new-post-submit"
                    type="submit"
                >
                    Create Post
                </button>
            </form>
            <div className='cancel-post-container'>
                <Link to='/' className='cancel-post-link'>Cancel</Link>
            </div>
        </div>
    )
}

export default CreatePostForm
