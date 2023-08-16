import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import './Login.css'
import { auth } from './firebase';

function Login() {

  const navigate = useNavigate();
  const [email,setemail] = useState('');
  const [pass,setpass] = useState('');

  const SignIn = (e) => {
    e.preventDefault(); // prevents from refreshing
    // here we do firebase login....

    auth.signInWithEmailAndPassword(email,pass).then((auth) =>{
      if(auth){
        navigate('/')
      }
      /* console.log(auth);
      this will be executed if successfully logged in with the given email and pass
      if successfully logged in with email and password
      redirect the user to the home page */
      
  })
  .catch(error => alert(error.message))

  }

  const register = (e) => {
    e.preventDefault(); // prevents from refreshing
    // here we do firebase register....

    auth.createUserWithEmailAndPassword(email,pass).then((auth) =>{
      if(auth){
        navigate('/')
      }  
      /* console.log(auth);
      this will be executed if successfully created a user with the given email and pass  
      if successfully created a new user with email and password
      redirect the new user to the home page */
        
    })
    .catch(error => alert(error.message))
  }

  return (
    <div className='login'>
      <Link to="/">
        <img
          src="https://evancarthey.com/wp-content/uploads/2019/02/amazon_logo_500500._V323939215_-500x450.png"
          alt=""
          className="login__logo"
        />
      </Link>
      <div className="login__container">
        <h1>Sign In</h1>
        <form action="">
          <h5>Email</h5>
          <input type="text" value={email} onChange={ (e) => {setemail(e.target.value)} } />
          <h5>Password</h5>
          <input type="Password" value={pass} onChange={ (e) => setpass(e.target.value) }/>
          <button className='login__sign' type='submit' onClick={SignIn}>Sign In</button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button className='login__register' onClick={register}>Create new Fake Amazon Account</button>
      </div>
    </div>
  );
}

export default Login