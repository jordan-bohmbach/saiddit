import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createOneSubSaiddit, getSubSaiddits } from "../../../store/subsaiddit"

const CreateSubsaidditForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const owner = useSelector(state => state.session.user)

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [rules, setRules] = useState('')
    const [moderatorId, setModeratorId] = useState(owner.id)

    const reset = () => {
        setName('')
        setImage('')
        setDescription('')
        setRules('')
        setModeratorId(owner.id)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            name,
            image,
            owner_id: owner?.id,
            description,
            rules,
            moderator_id : moderatorId,
            createdat : new Date(),
            updatedat : new Date(),
        }

        let createdSubsaiddit = await dispatch(createOneSubSaiddit(payload))
        if (createdSubsaiddit) {
            getSubSaiddits()
            reset()
            history.push('/')
        }

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
                <label className='new-subsaddit-input'>
                    Moderator
                    <select
                        value={moderatorId}
                        onChange={e=>setModeratorId(e.target.value)}
                    >
                        {/* {myPortfolios.map(portfolio => (
                            <option key={portfolio.id} value={portfolio.id}>
                                {portfolio.name}
                            </option>
                        ))} */}
                        <option key={owner?.id} value={owner?.id}>{owner?.username}</option>
                    </select>
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
