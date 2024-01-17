import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { FetchApi } from './components/FetchApi';
import { Buscador } from './components/Buscador';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <Buscador />
    <FetchApi />
    <Footer />
  </React.StrictMode>
);