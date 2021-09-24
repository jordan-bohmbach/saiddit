import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import CreatePostForm from './components/Forms/CreatePost';
import { getPosts } from './store/post';
import { getSubSaiddits } from './store/subsaiddit';
import { getUsers } from './store/user';
import CreateSubsaidditForm from './components/Forms/CreateSubsaiddit/Index';
import Splash from './components/Pages/Splash';
import IndividualSubsaiddit from './components/Pages/IndividualSubsaiddit';
import IndividualPost from './components/Pages/IndividualPost';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(()=>{
    dispatch(getPosts())
    dispatch(getSubSaiddits())
    dispatch(getUsers())
  }, [dispatch])

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Splash />
        </Route>
        <ProtectedRoute path='/posts/new' exact={true} >
          <CreatePostForm />
        </ProtectedRoute>
        <Route path='/posts/:postId' exact={true} >
          <IndividualPost />
        </Route>
        <ProtectedRoute path='/posts/:postId/edit' exact={true} >
          <CreatePostForm />
        </ProtectedRoute>
        <Route path='/subsaiddits' exact={true} >
  
        </Route>
        <ProtectedRoute path='/subsaiddits/new' exact={true} >
          <CreateSubsaidditForm />
        </ProtectedRoute>
        <Route path='/s/:subsaidditName' exact={true}>
          <IndividualSubsaiddit />
        </Route>
        <ProtectedRoute path='/s/:subsaidditName/edit' exact={true} >
          <CreateSubsaidditForm />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
