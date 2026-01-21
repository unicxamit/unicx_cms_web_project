import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter basename='/'>
      <App />
    </BrowserRouter>
);
