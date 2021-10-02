import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { getUsers } from '../../store/user';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([])
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    const frontendErrors = []

    if(username.length > 40) frontendErrors.push('Username cannot be longer than 40 characters')
    if(!username.length) frontendErrors.push('Username is required')
    if(!email.length) frontendErrors.push('Email is required')
    if(email.length > 255) frontendErrors.push('Email cannot be longer than 255 characters')
    if(!password.length) frontendErrors.push('Password is required')
    if(password.length > 50) frontendErrors.push('Password cannot be longer than 100 characters')

    setValidationErrors(frontendErrors)
  }, [username, email, password])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setValidationErrors(['Password and Confirmation do not match'])
    }
    await dispatch(getUsers())
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-form-container'>
      <h2>Sign up for a new account</h2>
      <form className='auth-signup-form' onSubmit={onSignUp}>
        <div>
          <ul className='signup-form-errors-ul'>
          {errors.map((error, ind) => (
            <li key={ind}>{error}</li>
          ))}
          {validationErrors.map(validationError=>(
            <li key={validationError}>{validationError}</li>
          ))}
          </ul>
        </div>
        <div>
          <label></label>
          <input
            placeholder='Username'
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label></label>
          <input
            placeholder='Email'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label></label>
          <input
            placeholder='Password'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label></label>
          <input
            placeholder = 'Confirm Password'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
