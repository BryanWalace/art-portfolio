import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import '@fontsource/orbitron/700.css';
import ShinyText from './ShinyText';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';


const Navbar = () => {
  const { language } = useLanguage();
  const currentText = translations[language];

  return (
    <nav className="main-nav">
      <NavLink to="/" className="logo">
        <ShinyText text="RAMD" speed={4} />
      </NavLink>
      
      <div className="nav-links">
        <NavLink to="/">{currentText.navHome}</NavLink>
        <NavLink to="/arts">{currentText.navArts}</NavLink>
        <NavLink to="/cosplay">{currentText.navCosplay}</NavLink>
        <NavLink to="/sobre">{currentText.navAbout}</NavLink>
      </div>
      
      <div className="nav-right-section">
        <div className="social-icons">
          <a 
                  href="https://www.instagram.com/ramd_rodrigo/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="icon-button"
                  title="Visit Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a 
                  href="https://behance.net/rodrigoramd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-button"
                  title="Visit Behance"
                >
                  <i className="fab fa-behance"></i>
                </a>
                <a 
                  href="https://www.linkedin.com/in/rodrigo-duenas-305354200/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-button"
                  title="Visit LinkedIn"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
                <a 
                  href="https://wa.me/5542999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-button"
                  title="Contact via WhatsApp"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
          
        </div>
        <LanguageSelector />
      </div>
    </nav>
  );
};

export default Navbar;