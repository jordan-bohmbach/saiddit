import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { getPosts } from './store/post';
import { getSubSaiddits } from './store/subsaiddit';
import { getUsers } from './store/user';
import CreateSubsaidditForm from './components/Forms/CreateSubsaiddit';
import Splash from './components/Pages/Splash';
import IndividualSubsaiddit from './components/Pages/IndividualSubsaiddit';
import IndividualPost from './components/Pages/IndividualPost';
import CreatePostPage from './components/Pages/CreatePostPage';
import CreateSubsaidditPage from './components/Pages/CreateSubsaidditPage';
import LoginPage from './components/Pages/LoginPage';
import SignupPage from './components/Pages/SignupPage';

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
          <LoginPage />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignupPage />
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
          <CreatePostPage />
        </ProtectedRoute>
        <Route path='/posts/:postId' exact={true} >
          <IndividualPost />
        </Route>
        <ProtectedRoute path='/posts/:postId/edit' exact={true} >
          <CreatePostPage />
        </ProtectedRoute>
        <Route path='/subsaiddits' exact={true} >
  
        </Route>
        <ProtectedRoute path='/subsaiddits/new' exact={true} >
          <CreateSubsaidditPage />
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
