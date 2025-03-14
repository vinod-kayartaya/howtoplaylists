import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage
    const loadedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(loadedFavorites);
  }, []);

  // Remove a playlist from favorites
  const removeFromFavorites = (playlistId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== playlistId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  // Clear all favorites
  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      localStorage.removeItem('favorites');
      setFavorites([]);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Favorite Playlists</h1>
        {favorites.length > 0 && (
          <button className="btn btn-outline-danger" onClick={clearAllFavorites}>
            Clear All Favorites
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-5">
          <p>You haven't added any playlists to your favorites yet.</p>
          <Link to="/" className="btn btn-primary mt-2">
            Browse Playlists
          </Link>
        </div>
      ) : (
        <div className="row">
          {favorites.map((playlist, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm">
                <Link to={`/playlist/${playlist.id}`} className="text-decoration-none">
                  <img 
                    src={playlist.thumbnail} 
                    alt={playlist.title}
                    className="card-img-top img-fluid"
                  />
                </Link>
                <div className="card-body">
                  <Link to={`/playlist/${playlist.id}`} className="text-decoration-none text-dark">
                    <h5 className="card-title">{playlist.title}</h5>
                  </Link>
                  <p className="card-text text-muted small">
                    {playlist.videoCount} videos • Added on {formatDate(playlist.timestamp)}
                  </p>
                  <button 
                    className="btn btn-outline-danger btn-sm mt-2"
                    onClick={() => removeFromFavorites(playlist.id)}
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites; 