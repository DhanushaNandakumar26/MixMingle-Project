// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify';
// import { handleError, handleSuccess } from '../../utils';
// import Background from "../../assets/bg.jpeg";
// import "./Signup.css"

// function Signup() {

//     const [signupInfo, setSignupInfo] = useState({
//         name: '',
//         email: '',
//         password: ''
//     })

//     const navigate = useNavigate();
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         console.log(name, value);
//         const copySignupInfo = { ...signupInfo };
//         copySignupInfo[name] = value;
//         setSignupInfo(copySignupInfo);
//     }

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         const { name, email, password } = signupInfo;
//         if (!name || !email || !password) {
//             return handleError('name, email and password are required')
//         }
//         try {
//             const url = `https://deploy-mern-app-1-api.vercel.app/auth/signup`;
//             const response = await fetch(url, {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(signupInfo)
//             });
//             const result = await response.json();
//             const { success, message, error } = result;
//             if (success) {
//                 handleSuccess(message);
//                 setTimeout(() => {
//                     navigate('/login')
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
//         <div className='SignupContainer'>
//             <div className='leftContainer'>
//                 <img src={Background} alt=''/>
//             </div>
//             <div className='rightContainer'>
//             <h1>Signup</h1>
//             <form onSubmit={handleSignup} className='SignupForm'>
//                 <div>
//                     {/* <label htmlFor='name'>Name</label> */}
//                     <input
//                         onChange={handleChange}
//                         type='text'
//                         name='name'
//                         autoFocus
//                         placeholder='Enter your name...'
//                         value={signupInfo.name}
//                     />
//                 </div>
//                 <div>
//                     {/* <label htmlFor='email'>Email</label> */}
//                     <input
//                         onChange={handleChange}
//                         type='email'
//                         name='email'
//                         placeholder='Enter your email...'
//                         value={signupInfo.email}
//                     />
//                 </div>
//                 <div>
//                     {/* <label htmlFor='password'>Password</label> */}
//                     <input
//                         onChange={handleChange}
//                         type='password'
//                         name='password'
//                         placeholder='Enter your password...'
//                         value={signupInfo.password}
//                     />
//                 </div>
//                 <div className='SignupFooter'>
//                 <button type='submit'>Signup</button>
//                 <span>Already have an account ?
//                     <Link to="/login">Login</Link>
//                 </span>
//                 </div>
//             </form>
//             </div>
//             <ToastContainer />
//         </div>
//     )
// }

// export default Signup

// src/components/Signup/Signup.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { setSignupInfo, signupUser } from '../../redux/Slices/SignupSlice';
import Background from "../../assets/bg.jpeg";
import { handleError, handleSuccess } from '../../utils';
import "./Signup.css";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signupInfo = useSelector((state) => state.signup);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setSignupInfo({ name, value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('name, email and password are required');
    }
    const resultAction = await dispatch(signupUser(signupInfo));
    if (signupUser.fulfilled.match(resultAction)) {
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  };

  return (
    <div className='SignupContainer'>
      <div className='leftContainer'>
        <img src={Background} alt='' />
      </div>
      <div className='rightContainer'>
        <h1>Signup</h1>
        <form onSubmit={handleSignup} className='SignupForm'>
          <div>
            <input
              onChange={handleChange}
              type='text'
              name='name'
              autoFocus
              placeholder='Enter your name...'
              value={signupInfo.name}
            />
          </div>
          <div>
            <input
              onChange={handleChange}
              type='email'
              name='email'
              placeholder='Enter your email...'
              value={signupInfo.email}
            />
          </div>
          <div>
            <input
              onChange={handleChange}
              type='password'
              name='password'
              placeholder='Enter your password...'
              value={signupInfo.password}
            />
          </div>
          <div className='SignupFooter'>
            <button type='submit'>Signup</button>
            <span>
              Already have an account ? <Link to="/login">Login</Link>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
