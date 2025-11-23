import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// 1. IMPORTA TU CSS ORIGINAL AQUÍ
import './assets/css/styles.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* 2. Envuelve App con el Router */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);