// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
// Crie estes componentes em breve
// import ArtsPage from './pages/ArtsPage';
// import CosplayPage from './pages/CosplayPage';
// import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      {/* A Navbar fica fora do <Routes> para aparecer em todas as páginas */}
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Adicione as outras rotas aqui quando as páginas estiverem prontas */}
        {/* <Route path="/arts" element={<ArtsPage />} /> */}
        {/* <Route path="/cosplay" element={<CosplayPage />} /> */}
        {/* <Route path="/sobre" element={<AboutPage />} /> */}

        {/* Exemplo de como serão as outras páginas: */}
        <Route path="/arts" element={<div style={{ paddingTop: '100px', paddingLeft: '50px' }}><h1>Página de Artes</h1></div>} />
        <Route path="/cosplay" element={<div style={{ paddingTop: '100px', paddingLeft: '50px' }}><h1>Página de Cosplay</h1></div>} />
        <Route path="/sobre" element={<div style={{ paddingTop: '100px', paddingLeft: '50px' }}><h1>Página Sobre</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;