import { useSelector } from "react-redux"
import SubsaidditList from "../../SubsaidditList"

const SubsaidditListPage = () => {
    const subsaidditList = useSelector(state=>Object.values(state.subsaiddits))

    return (
        <div className='subsaiddit-list-page-container'>
            <SubsaidditList subsaiddits={subsaidditList} header={'All Subsaiddits'}/>
        </div>
    )
}

export default SubsaidditListPage