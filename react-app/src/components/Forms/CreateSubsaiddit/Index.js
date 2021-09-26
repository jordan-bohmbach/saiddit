import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createOneSubSaiddit, getSubSaiddits, updateSubSaiddit } from "../../../store/subsaiddit"
import { useParams } from "react-router"

const CreateSubsaidditForm = () => {
    const { subsaidditName} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const owner = useSelector(state => state.session.user)
    const subsaidditList = useSelector(state=>Object.values(state.subsaiddits))
    const subsaiddit = subsaidditList.filter(subsaiddit => subsaiddit.name === subsaidditName)[0]
    const users = useSelector(state=>Object.values(state.users))

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [rules, setRules] = useState('')
    const [moderatorId, setModeratorId] = useState(owner.id)
    const [error, setError] = useState('')
    const [editing, setEditing] = useState(false)

    const reset = () => {
        setName('')
        setImage('')
        setDescription('')
        setRules('')
        setModeratorId(owner.id)
        setError('')
    }

    useEffect(()=>{
        if (subsaidditName){
            setEditing(true)
            setName(subsaiddit?.name)
            setImage(subsaiddit?.image)
            setDescription(subsaiddit?.description)
            setRules(subsaiddit?.rules)
            setModeratorId(subsaiddit?.moderatorId)
            setError('')
        }
    }, [subsaiddit, subsaidditName])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!editing){
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
        } else {
            const payload = {
                id: subsaiddit.id,
                name,
                image,
                description,
                rules,
                moderator_id : subsaiddit.moderator_id,
                updatedat : new Date()
            }

            let updatedSubsaiddit = await dispatch(updateSubSaiddit(payload))
            if(updatedSubsaiddit){
                getSubSaiddits()
                reset()
                history.push('/')
            }
        }

    }

    const handleNameChange = (e) => {
        if(e.target.value){
            if(e.target.value[e.target.value.length-1] === ' '){
                setError('Subsaiddit name cannot contain a space')
            } else if (e.target.value[e.target.value.length - 1] === '/'){
                setError("Subsaiddit name cannot contain a '/' character")
            }else {
                setName(e.target.value)
                setError('')
            }
        } else {
            setName('')
            setError('')
        }
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    return (
        <div className='create-subsaiddit-form'>
            <p>{error ? `* ${error}` : ""}</p>
            <form
                className='subsaiddit-form'
                onSubmit={handleSubmit}
            >
                <h2 className='new-subsaiddit'>{editing? 'Update Subsaiddit Information' :'Create a new Subsaiddit'}</h2>
                <label className='new-subsaiddit-input'>
                    Name
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                    />
                </label>
                <label className='new-subsaiddit-input'>
                    Image
                    <input type="file" onChange={updateFile} />
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
                <label className='new-subsaiddit-input'>
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
                        {users.map(user=>(
                            <option key={user.id} value={user.id}>{user.username}</option>
                        ))}
                    </select>
                </label>
                <button
                    className="new-subsaiddit-submit"
                    type="submit"
                >
                    {editing ? 'Update Subsaiddit' : 'Create Subsaiddit'}
                </button>
            </form>
            <div className='cancel-subsaiddit-container'>
                <Link to='/' className='cancel-subsaiddit-link'>Cancel</Link>
            </div>
        </div>
    )
}

export default CreateSubsaidditForm
