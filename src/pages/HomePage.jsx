// src/pages/HomePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';
import CardSwap, { Card } from '../components/CardSwap';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import ImageCarousel from '../components/ImageCarousel';
import { circularGalleryData1, circularGalleryData2 } from '../data/galleryData'; 
import TiltedCard from '../components/TiltedCard';
import { cosplayGridData } from '../data/cosplayData';

import cardImg1 from '../assets/card-image-1.jpg';
import cardImg2 from '../assets/card-image-2.jpg';
import cardImg3 from '../assets/card-image-3.jpg';

const HomePage = () => {
  const { language } = useLanguage();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const isScrolling = useRef(false);
  const containerRef = useRef(null);
  
  const sections = [
    { id: 'hero', type: 'hero' },
    { id: 'arts', titleKey: 'sectionTitleStickers', title2Key: 'sectionTitleIllustration', bgColor: 'var(--background-light)' },
    { id: 'cosplay', titleKey: 'sectionTitleCosplay', bgColor: 'var(--primary-lighter)' },
  ];

  const handleLinkClick = (index) => { if (isScrolling.current || index === currentSectionIndex) return; isScrolling.current = true; setCurrentSectionIndex(index); setTimeout(() => { isScrolling.current = false; }, 1000); };
  useEffect(() => { const handleWheel = (event) => { if (isScrolling.current) return; const scrollDown = event.deltaY > 0; let nextIndex = currentSectionIndex; if (scrollDown && currentSectionIndex < sections.length - 1) { nextIndex++; } else if (!scrollDown && currentSectionIndex > 0) { nextIndex--; } if (nextIndex !== currentSectionIndex) { isScrolling.current = true; setCurrentSectionIndex(nextIndex); setTimeout(() => { isScrolling.current = false; }, 1000); } }; window.addEventListener('wheel', handleWheel); return () => { window.removeEventListener('wheel', handleWheel); }; }, [currentSectionIndex]);
  useEffect(() => { if (containerRef.current) { const sectionTop = containerRef.current.children[currentSectionIndex].offsetTop; containerRef.current.scrollTo({ top: sectionTop, behavior: 'smooth' }); } }, [currentSectionIndex]);

  const currentText = translations[language];

  return (
    <main ref={containerRef} className="scroll-container">
      {sections.map((section) => {
        if (section.type === 'hero') {
          return (
            <section key={section.id} className="fullscreen-section hero-section">
              <div className="hero-text">
                <h1>{currentText.greeting}<br />{currentText.intro}{' '}<span className="link" onClick={() => handleLinkClick(1)}>{currentText.artist}</span>,{' '}<span className="link" onClick={() => handleLinkClick(1)}>{currentText.illustrator}</span>{' '}{currentText.and || 'e'}{' '}<span className="link" onClick={() => handleLinkClick(2)}>{currentText.cosplayer}</span>.</h1>
                <p>{currentText.subtitle}</p>
              </div>
              <div className="hero-visual">
                <CardSwap pauseOnHover={true}>
                  <Card imageSrc={cardImg1} />
                  <Card imageSrc={cardImg2} />
                  <Card imageSrc={cardImg3} />
                </CardSwap>
              </div>
            </section>
          );
        }

        if (section.id === 'arts') {
          return (
            <section key={section.id} className="fullscreen-section arts-section" style={{ backgroundColor: section.bgColor }}>
              <div className="arts-section-content">
                <h2>{currentText[section.titleKey]}</h2>
                <ImageCarousel items={circularGalleryData1} />
                <h2 className="second-title">{currentText[section.title2Key]}</h2>
                <ImageCarousel items={circularGalleryData2} />
              </div>
            </section>
          );
        }

        if (section.id === 'cosplay') {
          return (
            <section key={section.id} className="fullscreen-section cosplay-section" style={{ backgroundColor: section.bgColor }}>
              <div className="cosplay-grid-container">
                {cosplayGridData.map((cosplay, index) => (
                  <div key={index} className={`grid-item grid-item-${index + 1}`}>
                    <TiltedCard
                      imageSrc={cosplay.image}
                      altText={cosplay.character}
                      captionText={cosplay.character}
                    />
                  </div>
                ))}
              </div>
            </section>
          );
        }
        
        return (
          <section key={section.id} className="fullscreen-section" style={{ backgroundColor: section.bgColor }}>
            <h1>{section.title}</h1>
          </section>
        );
      })}
    </main>
  );
};

export default HomePage;