import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VscHome, VscPaintcan, VscPerson, VscInfo } from 'react-icons/vsc';

import Navbar from './Navbar';
import Dock from './Dock';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Header = () => {
  const { language } = useLanguage();
  const currentText = translations[language];
  const navigate = useNavigate();

  const dockItems = [
    { icon: <VscHome size={28} />, label: currentText.navHome, onClick: () => navigate('/') },
    { icon: <VscPaintcan size={28} />, label: currentText.navArts, onClick: () => navigate('/arts') },
    { icon: <VscPerson size={28} />, label: currentText.navCosplay, onClick: () => navigate('/cosplay') },
    { icon: <VscInfo size={28} />, label: currentText.navAbout, onClick: () => navigate('/sobre') },
  ];

  return (
    <header>
      <Navbar />
      <Dock items={dockItems} />
    </header>
  );
};

export default Header;