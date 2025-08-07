import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import ArtsPage from './pages/ArtsPage';
import CosplayPage from './pages/CosplayPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/arts" element={<ArtsPage />} />

        <Route path="/cosplay" element={<CosplayPage />} />

        <Route path="/sobre" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;