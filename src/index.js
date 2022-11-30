import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CryptoContext from './APIs/CryptoContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Allows currency and symbol to be used anywhere in app */}
    <CryptoContext>
    <App />
    </CryptoContext>
  </React.StrictMode>
);
