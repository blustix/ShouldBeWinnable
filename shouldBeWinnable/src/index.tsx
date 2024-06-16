import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './main';
import {BrowserRouter} from 'react-router-dom'
// import i18n (needs to be bundled ;)) 
import './i18n';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Main/>
    </BrowserRouter>
  </React.StrictMode>
);

