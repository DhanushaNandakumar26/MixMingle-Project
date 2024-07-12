// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify';
// import { handleError, handleSuccess } from '../../utils';
// import "./Login.css";
// import LoginBackground from "../../assets/bg.jpeg"

// function Login() {

//     const [loginInfo, setLoginInfo] = useState({
//         email: '',
//         password: ''
//     })

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         console.log(name, value);
//         const copyLoginInfo = { ...loginInfo };
//         copyLoginInfo[name] = value;
//         setLoginInfo(copyLoginInfo);
//     }

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         const { email, password } = loginInfo;
//         if (!email || !password) {
//             return handleError('email and password are required')
//         }
//         try {
//             const url = `https://deploy-mern-app-1-api.vercel.app/auth/login`;
//             const response = await fetch(url, {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(loginInfo)
//             });
//             const result = await response.json();
//             const { success, message, jwtToken, name, error } = result;
//             if (success) {
//                 handleSuccess(message);
//                 localStorage.setItem('token', jwtToken);
//                 localStorage.setItem('loggedInUser', name);
//                 setTimeout(() => {
//                     navigate('/home')
//                 }, 1000)
//             } else if (error) {
//                 const details = error?.details[0].message;
//                 handleError(details);
//             } else if (!success) {
//                 handleError(message);
//             }
//             console.log(result);
//         } catch (err) {
//             handleError(err);
//         }
//     }

//     return (
//         <div className='LoginContainer'>
//         <div className='LoginLeftContainer'>
//             <img src={LoginBackground} alt=''/>
//         </div>
//         <div className='LoginRightContainer'>
//             <h1>Login</h1>
//             <form onSubmit={handleLogin} className='LoginForm'>
//                 <div>
//                     {/* <label htmlFor='email'>Email</label> */}
//                     <input
//                         onChange={handleChange}
//                         type='email'
//                         name='email'
//                         placeholder='Enter your email...'
//                         value={loginInfo.email}
//                     />
//                 </div>
//                 <div>
//                     {/* <label htmlFor='password'>Password</label> */}
//                     <input
//                         onChange={handleChange}
//                         type='password'
//                         name='password'
//                         placeholder='Enter your password...'
//                         value={loginInfo.password}
//                     />
//                 </div>
//                 <div className='LoginFooter'>
//                 <button type='submit'>Login</button>
//                 <span>Does't have an account ?
//                     <Link to="/signup">Signup</Link>
//                 </span>
//                 </div>
//             </form>
//             <ToastContainer />
//         </div>
//         </div>
//     )
// }

// export default Login

// Login.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils';
import { loginSuccess, loginFailure } from '../../redux/Slices/AuthSlice'; // Import your actions and selectors
import "./Login.css";
import LoginBackground from "../../assets/bg.jpeg";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('Email and password are required');
    }
    try {
      const url = `https://deploy-mern-app-1-api.vercel.app/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        dispatch(loginSuccess({ jwtToken, name }));
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        dispatch(loginFailure(details));
        handleError(details);
      } else if (!success) {
        dispatch(loginFailure(message));
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      dispatch(loginFailure(err.toString()));
      handleError(err);
    }
  };

  return (
    <div className='LoginContainer'>
      <div className='LoginLeftContainer'>
        <img src={LoginBackground} alt=''/>
      </div>
      <div className='LoginRightContainer'>
        <h1>Login</h1>
        <form onSubmit={handleLogin} className='LoginForm'>
          <div>
            <input
              onChange={handleChange}
              type='email'
              name='email'
              placeholder='Enter your email...'
              value={loginInfo.email}
            />
          </div>
          <div>
            <input
              onChange={handleChange}
              type='password'
              name='password'
              placeholder='Enter your password...'
              value={loginInfo.password}
            />
          </div>
          <div className='LoginFooter'>
            <button type='submit'>Login</button>
            <span>Does't have an account ?
              <Link to="/signup">Signup</Link>
            </span>
          </div>
        </form>
        {error && <div className="error-message">{error}</div>}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
