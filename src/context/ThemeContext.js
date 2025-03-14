import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if user has a theme preference in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Update the theme link in the document head
  useEffect(() => {
    const themeLink = document.getElementById('bootstrap-theme');
    
    if (themeLink) {
      // Set the theme based on darkMode state
      themeLink.href = darkMode 
        ? 'https://bootswatch.com/5/sandstone/bootstrap.min.css'
        : 'https://bootswatch.com/5/yeti/bootstrap.min.css';
      
      // Add a data attribute to the body for additional theme-specific styling
      document.body.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
    } else {
      console.error('Theme link element not found. Make sure the link has id="bootstrap-theme"');
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 