import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';
import CardSwap, { Card } from '../components/CardSwap';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import ImageCarousel from '../components/ImageCarousel';
import { circularGalleryData1 } from '../data/galleryData'; 
import { circularGalleryData2 } from '../data/galleryData';

const HomePage = () => {
  const { language } = useLanguage();

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const isScrolling = useRef(false);
  const containerRef = useRef(null);
  
  const sections = [
    { id: 'hero', type: 'hero' },
    { id: 'arts', title: 'Stickers', title2: 'Ilustração', bgColor: 'var(--background-light)' },
    { id: 'cosplay', title: 'Cosplayer', bgColor: 'var(--primary-lighter)' },
  ];

  const handleLinkClick = (index) => { if (isScrolling.current || index === currentSectionIndex) return; isScrolling.current = true; setCurrentSectionIndex(index); setTimeout(() => { isScrolling.current = false; }, 1000); };
  
  useEffect(() => {
    const handleWheel = (event) => {
      if (isScrolling.current) return;
      const scrollDown = event.deltaY > 0;
      let nextIndex = currentSectionIndex;
      if (scrollDown && currentSectionIndex < sections.length - 1) { nextIndex++; } 
      else if (!scrollDown && currentSectionIndex > 0) { nextIndex--; } 
      if (nextIndex !== currentSectionIndex) {
        isScrolling.current = true;
        setCurrentSectionIndex(nextIndex);
        setTimeout(() => { isScrolling.current = false; }, 1000);
      }
    };
    window.addEventListener('wheel', handleWheel);
    return () => { window.removeEventListener('wheel', handleWheel); };
  }, [currentSectionIndex]);
  
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
                <CardSwap>
                  <Card><h3>{currentText.cardDigitalArt}</h3><p>{currentText.cardDigitalDesc}.</p></Card>
                  <Card><h3>{currentText.cardIllustration}</h3><p>{currentText.cardIllustrationDesc}.</p></Card>
                  <Card><h3>{currentText.cardCosplay}</h3><p>{currentText.cardCosplayDesc}.</p></Card>
                </CardSwap>
              </div>
            </section>
          );
        }

        if (section.id === 'arts') {
          return (
            <section key={section.id} className="fullscreen-section arts-section" style={{ backgroundColor: section.bgColor }}>
              <div className="arts-section-content">
                <h2>{section.title}</h2>
                <ImageCarousel items={circularGalleryData1} />
                <h2 className="second-title">{section.title2}</h2>
                <ImageCarousel items={circularGalleryData2} />
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