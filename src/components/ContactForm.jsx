import React from 'react';
import './ContactForm.css';
import { useLanguage } from '../context/LanguageContext'; 
import { translations } from '../translations';

const ContactForm = () => {
  const { language } = useLanguage();
  const currentText = translations[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(currentText.formAlertSuccess);
  };

  return (
    <div className="form-container">
      <h2>{currentText.formTitle}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{currentText.formNameLabel}</label>
          <input type="text" name="from_name" required />
        </div>
        <div className="form-group">
          <label>{currentText.formEmailLabel}</label>
          <input type="email" name="from_email" required />
        </div>
        <div className="form-group message-group">
          <label>{currentText.formMessageLabel}</label>
          <textarea name="message" required />
        </div>
        <button type="submit" className="send-button">{currentText.formSubmitButton}</button>
      </form>
    </div>
  );
};

export default ContactForm;