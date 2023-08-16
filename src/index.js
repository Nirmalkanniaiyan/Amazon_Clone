import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {StateProvider} from './StateProvider'
import reducer, { initialState } from './Reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //  StrictMode is used to identify and detect any problems within the application and show warning messages
  <StrictMode>
    {/* we are wrapping this within app so that the data layer can be used by all the component of the app */}
    
    <StateProvider  initialState = {initialState} reducer={reducer} >
      <App/> 
    </StateProvider>

  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
