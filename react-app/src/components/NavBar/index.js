
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { login } from '../../store/session';

import './NavBar.css'

import WordsLogo from '../../images/words_logo.png'

import SaidditLogo from '../../images/saiddit_logo.png'

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const postList = useSelector(state=>Object.values(state.posts))
  const subsaidditList = useSelector(state=>Object.values(state.subsaiddits))

  const demoLogin = async (e) => {
    await dispatch(login('demo@aa.io', 'password'))
  }

  const [searchWord, setSearchWord] = useState('')
  const [searchingClickOut, setSearchingClickOut] = useState(false)
  const [filteredPosts, setFilteredPosts] = useState([])
  const [filteredSubsaiddits, setFilteredSubsaiddits] = useState([])

  const handleTypeing = (e) => {
    setSearchWord(e.target.value)
    console.log('searchword = ', searchWord)
    // filteredSubsaiddits = subsaidditList.filter(subsaiddit=>subsaiddit.name.toLowerCase().includes(searchWord.toLowerCase()))
    
  }

  const handleBlur = () => {
    setTimeout(()=>setSearchingClickOut(true), 200)
  }

  const handleClick = () => {
    setSearchingClickOut(false)
  }

  useEffect(()=>{
    setFilteredPosts(postList.filter(post => post.title.toLowerCase().includes(searchWord.toLowerCase())))
    console.log('filtered posts = ', filteredPosts)
  }, [searchWord])

  return (
    <nav className='navbar-container'>
        <div className='logo'>
          <NavLink to='/' exact={true} activeClassName='active'>

            <img className='nav-logo' src={SaidditLogo} alt='logo not found' />
            <img className='nav-logo' src={WordsLogo} alt='logo not found' />
          </NavLink>
        </div>
          <div className='search-bar'>
            <input 
              type='text'
              name='search'
              value={searchWord}
              placeholder='Search' 
              onChange={handleTypeing} 
              onBlur={handleBlur} 
              onClick={handleClick}>

            </input>
            <div className='outer-search-results-container'>
              {(filteredPosts && searchWord) ? <ul className={ searchingClickOut ? 'invisible-search' : 'search-results-container'}>
                  {filteredPosts?.map(post => (
                    <li><Link to={`/posts/${post.id}`} >{post.title}</Link></li>
                  ))}
              </ul> : ''}
            </div>

          </div>
        <div className='nav-icons-container'>
          <div className='nav-popular nav-icon'>
            <NavLink to='/popular' exact={true} activeClassName='active'>
              <i className="fas fa-fire"></i>
            </NavLink>
          </div>
        <div className='nav-all nav-icon'>
          <NavLink to='/all' exact={true} activeClassName='active'>
            <i className="fas fa-globe"></i>
          </NavLink>
        </div>
        <div className='nav-chat nav-icon'>
          <NavLink to='/chat' exact={true} activeClassName='active'>
            <i className="far fa-comments"></i>
          </NavLink>
        </div>
          <div className='nav-create-post nav-icon'>
            <NavLink to='/posts/new' exact={true} activeClassName='active'>
              <i className="far fa-plus-square"></i>
            </NavLink>
          </div>
        </div>
      {user ? '' : 
        <div className='nav-login'>
          <button className='nav-login-buttons' onClick={demoLogin}>Demo</button>
          <NavLink className='nav-login-buttons' to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
          <NavLink className='nav-login-buttons' to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>}
      {user ? 
        <div className='nav-logout'>
          <LogoutButton />
          <NavLink className='nav-login-buttons' to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div> 
      : ''}

    </nav>
  );
}

export default NavBar;
