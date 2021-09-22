import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import './SubsaidditList.css'

const SubsaidditList = () => {
    const subsaiddits = useSelector(state=>Object.values(state.subsaiddits))

    return(
        <div className='subsaiddit-list-container'>
            <h1>Top Communities</h1>

            {subsaiddits.map(subsaiddit=>(
                <Link to={`/s/${subsaiddit.name}`}>{subsaiddit.name}</Link>
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