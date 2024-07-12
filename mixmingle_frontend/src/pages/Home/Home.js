// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { handleError, handleSuccess } from '../../utils';
// import { ToastContainer } from 'react-toastify';

// function Home() {
//     const [loggedInUser, setLoggedInUser] = useState('');
//     const [products, setProducts] = useState('');
//     const navigate = useNavigate();
//     useEffect(() => {
//         setLoggedInUser(localStorage.getItem('loggedInUser'))
//     }, [])

//     const handleLogout = (e) => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('loggedInUser');
//         handleSuccess('User Loggedout');
//         setTimeout(() => {
//             navigate('/login');
//         }, 1000)
//     }

//     const fetchProducts = async () => {
//         try {
//             const url = "https://deploy-mern-app-1-api.vercel.app/products";
//             const headers = {
//                 headers: {
//                     'Authorization': localStorage.getItem('token')
//                 }
//             }
//             const response = await fetch(url, headers);
//             const result = await response.json();
//             console.log(result);
//             setProducts(result);
//         } catch (err) {
//             handleError(err);
//         }
//     }
//     useEffect(() => {
//         fetchProducts()
//     }, [])

//     return (
//         <div>
//             <h1>Welcome {loggedInUser}</h1>
//             <button onClick={handleLogout}>Logout</button>
//             <div>
//                 {
//                     products && products?.map((item, index) => (
//                         <ul key={index}>
//                             <span>{item.name} : {item.price}</span>
//                         </ul>
//                     ))
//                 }
//             </div>
//             <ToastContainer />
//         </div>
//     )
// }

// export default Home

// src/components/Home.js

// src/components/Home.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, logout } from '../../redux/Slices/UserSlice';
import { ToastContainer } from 'react-toastify';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');
  const { products, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login');
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, loggedInUser, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'succeeded' && products?.map((item, index) => (
          <ul key={index}>
            <span>{item.name} : {item.price}</span>
          </ul>
        ))}
        {status === 'failed' && <p>{error}</p>}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
