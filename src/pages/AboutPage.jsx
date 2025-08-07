import React, { useEffect } from 'react';
import { FaBehance, FaWhatsapp, FaLinkedin, FaInstagram } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import perfilImg from '../assets/perfil.jpg';
import './AboutPage.css';
import { useLanguage } from '../context/LanguageContext'; 
import { translations } from '../translations'; 

const AboutPage = () => {
  const { language } = useLanguage();
  const currentText = translations[language];

  useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, []);

  return (
    <div className="about-page-container">
      <section className="about-intro-section">
        <div className="intro-content">
          <div className="intro-text">
            <h1>{currentText.aboutTitle}</h1>
            <p>{currentText.aboutSubtitle}</p>
            <div className="social-links">
              <a href="http://www.behance.net/rodrigoramd" target="_blank" rel="noopener noreferrer">
                <FaBehance /> {currentText.socialBehance}
              </a>
              <a href="https://wa.me/5542999999999" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp /> {currentText.socialWhatsapp}
              </a>
              <a href="https://www.linkedin.com/in/rodrigo-duenas-305354200/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin /> {currentText.socialLinkedin}
              </a>
              <a href="https://www.instagram.com/ramd_rodrigo/" target="_blank" rel="noopener noreferrer">
                <FaInstagram /> {currentText.socialInstagram}
              </a>
            </div>
          </div>
          <div className="intro-image">
            <img src={perfilImg} alt={currentText.profileImageAlt} />
          </div>
        </div>
      </section>

      <section className="about-form-section">
        <ContactForm />
      </section>

      <footer className="about-footer">
        <p>
          &copy; {new Date().getFullYear()} Bryan Walace. {currentText.footerRights}
          <br />
          {currentText.footerMadeBy}{' '}
          <a href="https://github.com/BryanWalace" target="_blank" rel="noopener noreferrer">
            Bryan Walace.
          </a>
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;