import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSelector.css';

const globeIconPath = '/icons/globe.svg';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const selectAndClose = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="language-selector-container" ref={dropdownRef}>
      <button 
        className={`language-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <img src={globeIconPath} alt="Selecionar Idioma" />
      </button>

      {isOpen && (
        <div className="language-dropdown">
          <button onClick={() => selectAndClose('pt')} className={language === 'pt' ? 'active' : ''}>
            Português
          </button>
          <button onClick={() => selectAndClose('en')} className={language === 'en' ? 'active' : ''}>
            English
          </button>
          <button onClick={() => selectAndClose('es')} className={language === 'es' ? 'active' : ''}>
            Español
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;