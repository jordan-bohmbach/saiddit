
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { login } from '../../store/session';

import './NavBar.css'

import RedditLogo from '../../images/reddit_logo.png'
import TwitterLogo from '../../images/twitter_logo.png'
import WordsLogo from '../../images/words_logo.png'

import SaidditLogo from '../../images/saiddit_logo.png'

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  const demoLogin = async (e) => {
    await dispatch(login('demo@aa.io', 'password'))
  }

  return (
    <nav className='navbar-container'>
        <div className='logo'>
          <NavLink to='/' exact={true} activeClassName='active'>
            {/* <img className='nav-logo' src={RedditLogo} alt='logo not found'/>
            <img className='nav-logo' src={WordsLogo} alt='logo not found' />
            <img className='nav-logo' src={TwitterLogo} alt='logo not found' /> */}
            <img className='nav-logo' src={SaidditLogo} alt='logo not found' />
            <img className='nav-logo' src={WordsLogo} alt='logo not found' />
          </NavLink>
        </div>
          <div className='search-bar'>
            <input placeholder='Search'></input>
          </div>
        <div className='nav-icons-container'>
          <div className='nav-popular nav-icon'>
            <NavLink to='/popular' exact={true} activeClassName='active'>
              <i class="fas fa-fire"></i>
            </NavLink>
          </div>
        <div className='nav-all nav-icon'>
          <NavLink to='/all' exact={true} activeClassName='active'>
            <i class="fas fa-globe"></i>
          </NavLink>
        </div>
        <div className='nav-chat nav-icon'>
          <NavLink to='/chat' exact={true} activeClassName='active'>
            <i class="far fa-comments"></i>
          </NavLink>
        </div>
          <div className='nav-create-post nav-icon'>
            <NavLink to='/posts/new' exact={true} activeClassName='active'>
              <i class="far fa-plus-square"></i>
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
