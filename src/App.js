import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Context
import { ThemeProvider } from './context/ThemeContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import PlaylistDetail from './components/PlaylistDetail';
import Favorites from './components/Favorites';
import History from './components/History';
import About from './components/About';
import NotFound from './components/NotFound';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1 mb-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/playlist/:id" element={<PlaylistDetail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/history" element={<History />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
