import React, { useEffect, useRef, useState } from 'react';
import Colcade from 'colcade';
import { artworkGalleryData } from '../data/artsData';
import './ArtsPage.css';

const ArtsPage = () => {
  const gridRef = useRef(null);
  const colcadeRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageView, setShowImageView] = useState(false);

  useEffect(() => {
    if (gridRef.current) {
      colcadeRef.current = new Colcade(gridRef.current, {
        columns: '.grid-col',
        items: '.grid-item'
      });
    }

    return () => {
      if (colcadeRef.current) {
        colcadeRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showImageView) return;

      switch(e.key) {
        case 'ArrowLeft':
          handlePrevImage();
          break;
        case 'ArrowRight':
          handleNextImage();
          break;
        case 'Escape':
          handleCloseView();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showImageView, selectedImage]);

  const handleImageClick = (art) => {
    setSelectedImage(art);
    setShowImageView(true);
  };

  const handleCloseView = () => {
    setShowImageView(false);
    setSelectedImage(null);
  };

  const handlePrevImage = () => {
    const currentIndex = artworkGalleryData.findIndex(art => art.id === selectedImage.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : artworkGalleryData.length - 1;
    setSelectedImage(artworkGalleryData[prevIndex]);
  };

  const handleNextImage = () => {
    const currentIndex = artworkGalleryData.findIndex(art => art.id === selectedImage.id);
    const nextIndex = currentIndex < artworkGalleryData.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(artworkGalleryData[nextIndex]);
  };

  const handleShare = async () => {
    if (!selectedImage) return;

    const shareData = {
      title: selectedImage.title || 'Check out this artwork',
      text: selectedImage.description || 'Amazing artwork from my portfolio',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (clipboardError) {
        console.error('Error copying to clipboard:', clipboardError);
        alert('Unable to share. Please try again.');
      }
    }
  };

  return (
    <div className="arts-page">
      <div className="grid" ref={gridRef}>
        <div className="grid-col grid-col--1"></div>
        <div className="grid-col grid-col--2"></div>
        <div className="grid-col grid-col--3"></div>
        <div className="grid-col grid-col--4"></div>
        
        {artworkGalleryData.map((art) => (
          <div key={art.id} className="grid-item" onClick={() => handleImageClick(art)}>
            <img src={art.src} alt={art.title} loading="lazy" />
          </div>
        ))}
      </div>

      {showImageView && selectedImage && (
        <div className="image-view-overlay" onClick={handleCloseView}>
          <div className="image-view-content" onClick={e => e.stopPropagation()}>
            <div className="image-view-header">
              <div className="image-view-actions-left">
                <button 
                  className="icon-button" 
                  onClick={handleShare}
                  title="Share artwork"
                >
                  <i className="fas fa-share-alt"></i>
                </button>
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
              <button 
                className="icon-button close-button" 
                onClick={handleCloseView}
                title="Close"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="image-view-main">
              <button 
                className="nav-button prev-button" 
                onClick={handlePrevImage}
                title="Previous image"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title}
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
              <button 
                className="nav-button next-button" 
                onClick={handleNextImage}
                title="Next image"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtsPage;
