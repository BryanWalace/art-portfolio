// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import '@fontsource/orbitron/700.css';
import ShinyText from './ShinyText';
import LanguageSelector from './LanguageSelector'; // <-- IMPORTE AQUI

const Navbar = () => {
  return (
    <nav className="main-nav">
      <NavLink to="/" className="logo">
        <ShinyText text="RAMD" speed={4} />
      </NavLink>
      
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/arts">Arts</NavLink>
        <NavLink to="/cosplay">Cosplay</NavLink>
        <NavLink to="/sobre">Sobre</NavLink>
      </div>
      
      {/* Agrupamos os ícones e o seletor */}
      <div className="nav-right-section">
        <div className="social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/icons/instagram.svg" alt="Instagram" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="/icons/twitter.svg" alt="Twitter" />
          </a>
        </div>
        <LanguageSelector /> {/* <-- ADICIONE AQUI */}
      </div>
    </nav>
  );
};

export default Navbar;