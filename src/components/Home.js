import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import playlistsData from '../data/playlists.json';
import { ThemeContext } from '../context/ThemeContext';

const Home = () => {
  const [playlists, setPlaylists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [filterText, setFilterText] = useState('');
  const { darkMode } = useContext(ThemeContext);
  const searchInputRef = useRef(null);

  useEffect(() => {
    setPlaylists(playlistsData.playlists);
    setFilteredPlaylists(playlistsData.playlists);
    
    // Focus the search input when component mounts
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Filter playlists based on search text
  const handleFilterChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    setFilterText(searchText);
    
    if (searchText.trim() === '') {
      setFilteredPlaylists(playlists);
    } else {
      const filtered = playlists.filter(playlist => 
        playlist.title.toLowerCase().includes(searchText) || 
        (playlist.description && playlist.description.toLowerCase().includes(searchText))
      );
      setFilteredPlaylists(filtered);
    }
  };

  // Clear filter
  const clearFilter = () => {
    setFilterText('');
    setFilteredPlaylists(playlists);
    // Re-focus the search input after clearing
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Add to history when a playlist is clicked
  const handlePlaylistClick = (playlist) => {
    const history = JSON.parse(localStorage.getItem('watchHistory') || '[]');
    
    // Check if playlist already exists in history
    const existingIndex = history.findIndex(item => item.id === playlist.id);
    
    // If exists, remove it to add it to the top
    if (existingIndex !== -1) {
      history.splice(existingIndex, 1);
    }
    
    // Add playlist to the beginning of history
    history.unshift({
      id: playlist.id,
      title: playlist.title,
      thumbnail: playlist.thumbnail,
      timestamp: new Date().toISOString()
    });
    
    // Keep only the most recent 20 items
    const updatedHistory = history.slice(0, 20);
    
    localStorage.setItem('watchHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-12">
          <div className="input-group">
            <input
              ref={searchInputRef}
              type="text"
              className="form-control"
              placeholder="Search playlists..."
              value={filterText}
              onChange={handleFilterChange}
              aria-label="Search playlists"
            />
            {filterText && (
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={clearFilter}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {filteredPlaylists.length === 0 ? (
        <div className="alert alert-info">
          No playlists found matching "{filterText}". Try a different search term.
        </div>
      ) : (
        <div className="row">
          {filteredPlaylists.map(playlist => (
            <div key={playlist.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm">
                <Link 
                  to={`/playlist/${playlist.id}`} 
                  onClick={() => handlePlaylistClick(playlist)}
                  className="text-decoration-none"
                >
                  <img 
                    className="card-img-top img-fluid" 
                    src={playlist.thumbnail} 
                    alt={playlist.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{playlist.title}</h5>
                    <p className="card-text text-muted small">
                      {playlist.videos?.length || 0} videos
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home; 