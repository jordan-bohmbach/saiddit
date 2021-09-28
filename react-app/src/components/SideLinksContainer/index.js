import { Link } from "react-router-dom"

const SideLinksContainer = () => {
    return (
        <div className='side-links-container'>
            <Link to='/help'>Help</Link>
            <Link to='/about'>About</Link>
            <Link to='/coins'>Saiddit Coins</Link>
            <Link to='/gifts'>Saiddit Gifts</Link>
            <Link to='/careers'>Careers</Link>
            <Link to='/blog'>Blog</Link>
        </div>
    )
}

export default SideLinksContainer