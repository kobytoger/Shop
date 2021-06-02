import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css';
import App from './App';
//redux imports
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
/* 
//non redux version: 
  <React.StrictMode>
    <App />
  </React.StrictMode>, 
*/

  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

