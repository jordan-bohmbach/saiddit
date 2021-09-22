import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
// import { createOnePost } from "../../store/post"
// import { getPosts } from "../../store/post"

const CreateSubsaidditForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const ownerId = useSelector(state => state.session.user.id)

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [rules, setRules] = useState('')
    const [moderator, setModerator] = useState('')

    const reset = () => {
        setName('')
        setImage('')
        setDescription('')
        setRules('')
        setModerator('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            name,
            image,
            owner_id: ownerId,
            description,
            rules,
            moderator_id : ownerId,
            createdat : new Date(),
            updatedat : new Date(),
        }

        // let createdPost = await dispatch(createOnePost(payload))
        // if (createdPost) {
        //     getPosts()
        //     reset()
        //     history.push('/')
        // }

    }

    return (
        <div className='create-subsaiddit-form'>
            <form
                className='subsaiddit-form'
                onSubmit={handleSubmit}
            >
                <h2 className='new-subsaiddit'>Create a new Subsaiddit</h2>
                <label className='new-subsaiddit-input'>
                    Name
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <label className='new-subsaiddit-input'>
                    Image
                    <input
                        type='text'
                        name='image'
                        value={image}
                        onChange={e => setImage(e.target.value)}
                    />
                </label>
                <label className='new-subsaiddit-input'>
                    Description
                    <input
                        type='text'
                        name='description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </label>
                <label className='new-subsaiddit-input'>
                    Rules
                    <input
                        type='text'
                        name='rules'
                        value={rules}
                        onChange={e => setRules(e.target.value)}
                    />
                </label>
                <button
                    className="new-subsaiddit-submit"
                    type="submit"
                >
                    Create Subsaiddit
                </button>
            </form>
            <div className='cancel-subsaiddit-container'>
                <Link to='/' className='cancel-subsaiddit-link'>Cancel</Link>
            </div>
        </div>
    )
}

export default CreateSubsaidditForm
