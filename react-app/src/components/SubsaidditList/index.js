import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deletesubSaiddit } from "../../store/subsaiddit"
import { getPosts } from "../../store/post"

import './SubsaidditList.css'

const SubsaidditList = () => {
    const subsaiddits = useSelector(state=>Object.values(state.subsaiddits))
    const userId = useSelector(state => state.session.user?.id)
    const dispatch = useDispatch()

    const handleSubsaidditDelete = async (e) => {
        const a = await dispatch(deletesubSaiddit(e.target.value))
        const b = await dispatch(getPosts())
    }

    return(
        <div className='subsaiddit-list-container'>
            <h1>Top Communities</h1>

            {subsaiddits.map(subsaiddit=>(
            <div key={subsaiddit.id}>
                <Link to={`/s/${subsaiddit.name}`}>{subsaiddit.name}</Link>
                {userId === subsaiddit.owner_id ? <button value={subsaiddit.id} onClick={handleSubsaidditDelete}>Delete</button>: ''}
            </div>
            ))}

            <button>View All</button>
            <div>
                <button>Top</button>
                <button>Near You</button>
                <button>Gaming</button>
            </div>
        </div>
    )
}

export default SubsaidditList