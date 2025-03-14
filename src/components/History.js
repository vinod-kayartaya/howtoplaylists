import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const History = () => {
  const [playlistHistory, setPlaylistHistory] = useState([]);
  const [videoHistory, setVideoHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('videos');

  useEffect(() => {
    // Load history from localStorage
    const loadedPlaylistHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]');
    const loadedVideoHistory = JSON.parse(localStorage.getItem('videoHistory') || '[]');
    
    setPlaylistHistory(loadedPlaylistHistory);
    setVideoHistory(loadedVideoHistory);
  }, []);

  // Clear all history
  const clearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear all your watch history?')) {
      localStorage.removeItem('watchHistory');
      localStorage.removeItem('videoHistory');
      setPlaylistHistory([]);
      setVideoHistory([]);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Watch History</h1>
        {(playlistHistory.length > 0 || videoHistory.length > 0) && (
          <button className="btn btn-outline-danger" onClick={clearAllHistory}>
            Clear All History
          </button>
        )}
      </div>

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'videos' ? 'active' : ''}`} 
            onClick={() => setActiveTab('videos')}
          >
            Videos ({videoHistory.length})
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'playlists' ? 'active' : ''}`} 
            onClick={() => setActiveTab('playlists')}
          >
            Playlists ({playlistHistory.length})
          </button>
        </li>
      </ul>

      <div className="tab-content">
        <div className={`tab-pane fade ${activeTab === 'videos' ? 'show active' : ''}`}>
          {videoHistory.length === 0 ? (
            <div className="text-center py-5">
              <p>You haven't watched any videos yet.</p>
            </div>
          ) : (
            <div className="list-group">
              {videoHistory.map((item, index) => (
                <div key={index} className="list-group-item p-3">
                  <div className="row">
                    <div className="col-12 col-md-3 col-lg-2">
                      <Link to={`/playlist/${item.playlistId}?video=${item.videoId}`}>
                        <img 
                          src={item.videoThumbnail} 
                          alt={item.videoTitle} 
                          className="img-fluid rounded"
                        />
                      </Link>
                    </div>
                    <div className="col-12 col-md-9 col-lg-10">
                      <Link 
                        to={`/playlist/${item.playlistId}?video=${item.videoId}`}
                        className="text-decoration-none text-dark"
                      >
                        <h5>{item.videoTitle}</h5>
                      </Link>
                      <p className="text-muted mb-1">
                        From playlist: {item.playlistTitle}
                      </p>
                      <small className="text-muted">
                        Watched on {formatDate(item.timestamp)}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={`tab-pane fade ${activeTab === 'playlists' ? 'show active' : ''}`}>
          {playlistHistory.length === 0 ? (
            <div className="text-center py-5">
              <p>You haven't viewed any playlists yet.</p>
            </div>
          ) : (
            <div className="row">
              {playlistHistory.map((playlist, index) => (
                <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                  <div className="card h-100 shadow-sm">
                    <Link to={`/playlist/${playlist.id}`} className="text-decoration-none">
                      <img 
                        src={playlist.thumbnail} 
                        alt={playlist.title}
                        className="card-img-top img-fluid"
                      />
                      <div className="card-body">
                        <h5 className="card-title text-dark">{playlist.title}</h5>
                        <p className="card-text text-muted small">
                          Viewed on {formatDate(playlist.timestamp)}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History; 