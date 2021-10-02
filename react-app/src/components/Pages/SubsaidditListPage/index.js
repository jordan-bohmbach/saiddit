import { useEffect } from "react"
import { useSelector } from "react-redux"
import SideLinksContainer from "../../SideLinksContainer"
import SubsaidditList from "../../SubsaidditList"

import './SubsaidditListPage.css'

const SubsaidditListPage = () => {
    const subsaidditList = useSelector(state=>Object.values(state.subsaiddits))
    const mostSubscribedSubsaiddits = subsaidditList.slice(0, 5) //sort this by follows later
    const postList = useSelector(state=>Object.values(state.posts))

    let alphabeticalSubsaidditList = [...subsaidditList]
    
    alphabeticalSubsaidditList = alphabeticalSubsaidditList.sort((a, b) => {
        if(a.name < b.name) return -1
        if(a.name > b.name) return 1
        return 0
    })

    let popularSubsaidditList = [...subsaidditList]
    useEffect(()=>{
        popularSubsaidditList.forEach((subsaiddit, i)=>{
            popularSubsaidditList[i].postCount = 0
        })

        postList.forEach(post=>{
            popularSubsaidditList.forEach((subsaiddit, i)=>{
                if(subsaiddit.id === post.subsaiddit_id){
                    popularSubsaidditList[i].postCount++
                }
            })
        })
        
    }, [postList, subsaidditList])
    
    popularSubsaidditList.sort((a, b)=> {
        if(a.postCount < b.postCount) return 1
        if(a.postCount > b.postCount) return -1
        return 0
    })

    const finalPopularSubsaidditList = popularSubsaidditList.slice(0,5)

    return (
        <div className='subsaiddit-list-page-container'>
            <div className='left-side-subsaiddit-list-container'>
                <SubsaidditList subsaiddits={alphabeticalSubsaidditList} header={'All Subsaiddits Sorted Alphabetically'} create={'Create Community'}/>
            </div>
            <div className='right-side-subsaiddit-list-container'>
                <SubsaidditList subsaiddits={finalPopularSubsaidditList} header={'Most Posted-in Subsasaiddits'} create={'Create Community'} />
                <div className='spacer-div'></div>
                {/* <SubsaidditList className='most-subscribed-subsaiddits-container' subsaiddits={mostSubscribedSubsaiddits} header={'Most Commented-on Subsaiddts'} create={'Create Community'}/> */}
                {/* <SideLinksContainer /> */}
            </div>
        </div>
    )
}

export default SubsaidditListPage