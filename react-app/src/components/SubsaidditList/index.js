import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deletesubSaiddit } from "../../store/subsaiddit"
import { getPosts } from "../../store/post"
import { useHistory } from "react-router"

import './SubsaidditList.css'

const SubsaidditList = ({subsaiddits, header}) => {
    const userId = useSelector(state => state.session.user?.id)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubsaidditDelete = async (e) => {
        const a = await dispatch(deletesubSaiddit(e.target.value))
        const b = await dispatch(getPosts())
    }

    const handleSubsaidditEdit = async (e) => {
        history.push(`/s/${e.target.value}/edit`)
    }

    const handleViewAllSubsaiddits = () => {
        history.push('/subsaiddits')
    }

    return(
        <div className='subsaiddit-list-container'>
            <h1>{header}</h1>

            {subsaiddits.map(subsaiddit=>(
            <div className='top-communities-row-container' key={subsaiddit.id}>
                <Link className='top-communities-row-link' to={`/s/${subsaiddit.name}`}>
                    <img className='top-communities-row-image' src={subsaiddit.image} alt='not found'></img>
                    {`s/${subsaiddit.name}`}
                </Link>
                <div className='top-communities-modification-container'>
                    {userId === subsaiddit.owner_id ? <button className='top-communities-modification-button' value={subsaiddit.id} onClick={handleSubsaidditDelete}>Delete</button>: ''}
                    {userId === subsaiddit.owner_id ? <button className='top-communities-modification-button' value={subsaiddit.name} onClick={handleSubsaidditEdit}>Edit</button> : ''}
                </div>
            </div>
            ))}

            <button className='view-all-communities-button' onClick={handleViewAllSubsaiddits}>View All</button>
            {/* <div>
                <button className='top-communities-sort-buttons'>Top</button>
                <button className='top-communities-sort-buttons'>Near You</button>
                <button className='top-communities-sort-buttons'>Gaming</button>
            </div> */}
        </div>
    )
}

export default SubsaidditList