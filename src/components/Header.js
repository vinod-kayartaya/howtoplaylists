import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Header = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src="/icons/default-32x32.png" 
            alt="HowTo? Playlists Logo" 
            width="32" 
            height="32" 
            className="me-2" 
          />
          HowTo? Playlists
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">Favorites</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/history">History</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item d-flex align-items-center ms-2">
              <button 
                className="btn btn-sm btn-outline-light" 
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <span>☀️ Light</span>
                ) : (
                  <span>🌙 Dark</span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header; 