import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createOneSubSaiddit, getSubSaiddits, updateSubSaiddit } from "../../../store/subsaiddit"
import { useParams } from "react-router"

import './CreateSubsaiddit.css'

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
    const [moderatorId, setModeratorId] = useState(subsaiddit ? subsaiddit?.moderator_id : owner?.id)
    const [error, setError] = useState('')
    const [editing, setEditing] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])

    const reset = () => {
        setName('')
        setImage('')
        setDescription('')
        setRules('')
        // console.log('moderatorId = ', moderatorId)
        setModeratorId(owner?.id)
        setError('')
        history.push('/')
    }

    
    useEffect(() => {
        let regex = /^[A-Za-z]+$/;
        const errors = []

        if (name?.length > 100) errors.push('Name should be 100 characters or less')
        if (!name?.length) errors.push('Subsaiddit name is required')
        if (name?.includes(' ')) errors.push('Subsaiddit name cannot contain spaces')
        if (!image) errors.push('Subsaiddit must have an image')
        if (description?.length > 500) errors.push('Subsaiddit description must be 500 characters or less')
        if (!description?.length) errors.push('Subsaiddit must have a description')
        if (rules?.length > 500) errors.push('Subsaiddit rules must be 500 characters or less')
        if (!rules?.length) errors.push('Subsaiddit must have rules')
        if (!editing)

        if(name.length && !regex.test(name)) errors.push('Subsaiddit name can only container letters')

        setValidationErrors(errors)

    }, [name, image, description, rules, editing])

    useEffect(()=>{
        if (subsaidditName){
            setEditing(true)
            setName(subsaiddit?.name)
            setImage(subsaiddit?.image)
            setDescription(subsaiddit?.description)
            setRules(subsaiddit?.rules)
            setModeratorId(subsaiddit?.moderator_id)
            setError('')
        }
    }, [subsaiddit, subsaidditName])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validationErrors.length) {
            return
        }

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
                moderator_id: moderatorId,
                updatedat : new Date()
            }

            // console.log('in the handleSubmit, payload = ', payload)

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
        <div className='create-subsaiddit-form-container'>
            <form
                className='create-subsaiddit-form'
                onSubmit={handleSubmit}
            >
                <h2 className='new-subsaiddit'>{editing? 'Update Subsaiddit Information' :'Create a new Subsaiddit'}</h2>
                <ul className='subsaiddit-creation-errors'>
                    {validationErrors.map(validationError=>(
                        <li key={validationError}>{validationError}</li>
                    ))}
                    {error ? <li>{error}</li> : ""}
                </ul>
                <div className='new-subsaiddit-outer-container'>
                    <label className='new-subsaiddit-input'>
                        <input
                            placeholder='Name with no spaces'
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </label>
                    <div className='new-subsaiddit-upper-container'>
                        <label className='new-subsaiddit-input'>
                            <textarea
                                placeholder='Subsaiddit Description'
                                type='text'
                                name='description'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </label>
                        <label className='new-subsaiddit-input'>
                            <textarea
                                placeholder='Subsaiddit Rules'
                                type='text'
                                name='rules'
                                value={rules}
                                onChange={e => setRules(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className='new-subsaiddit-middle-container'>
                        <label className='new-subsaiddit-input'>
                            Image
                            <input type="file" onChange={updateFile} className='upload-file-input'/>
                        </label>
                        <label className='new-subsaiddit-input'>
                            Moderator
                            <select
                                className='new-subsaiddit-moderator-selector'
                                value={moderatorId}
                                onChange={e=>setModeratorId(e.target.value)}
                            >
                            {users.map(user=>(
                                <option key={user.id} value={user.id}>{user.username}</option>
                            ))}
                            </select>
                        </label>
                    </div>
                    <div className='subsaiddit-form-buttons'>
                        <button
                            className="cancel-subsaiddit-button"
                            onClick={reset}
                        >
                            Cancel
                        </button>
                        <button
                            className="new-subsaiddit-submit"
                            type="submit"
                        >
                            {editing ? 'Update Subsaiddit' : 'Create Subsaiddit'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default CreateSubsaidditForm
