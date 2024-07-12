import './index.css';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/Store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
     <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


