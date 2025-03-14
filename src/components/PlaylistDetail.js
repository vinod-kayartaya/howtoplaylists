import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import playlistsData from '../data/playlists.json';
import { ThemeContext } from '../context/ThemeContext';

const PlaylistDetail = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { /* darkMode */ } = useContext(ThemeContext);
  
  const [playlist, setPlaylist] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [filteredVideos, setFilteredVideos] = useState([]);
  const searchInputRef = useRef(null);

  useEffect(() => {
    // Find the playlist by ID
    const foundPlaylist = playlistsData.playlists.find(p => p.id === id);
    
    if (foundPlaylist) {
      setPlaylist(foundPlaylist);
      setFilteredVideos(foundPlaylist.videos || []);
      
      // Check if there's a video ID in the URL params
      const videoId = searchParams.get('video');
      
      if (videoId && foundPlaylist.videos) {
        const video = foundPlaylist.videos.find(v => v.id === videoId);
        if (video) {
          setSelectedVideo(video);
          addToHistory(video, foundPlaylist);
        } else if (foundPlaylist.videos.length > 0) {
          // If video not found but playlist has videos, select the first one
          setSelectedVideo(foundPlaylist.videos[0]);
          addToHistory(foundPlaylist.videos[0], foundPlaylist);
        }
      } else if (foundPlaylist.videos && foundPlaylist.videos.length > 0) {
        // Set the first video as selected by default
        setSelectedVideo(foundPlaylist.videos[0]);
        addToHistory(foundPlaylist.videos[0], foundPlaylist);
      }
      
      // Focus the search input when component mounts
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }
    
    // Check if playlist is in favorites
    checkIfFavorite(id);
  }, [id, searchParams]);

  // Filter videos based on search text
  const handleFilterChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    setFilterText(searchText);
    
    if (!playlist || !playlist.videos) return;
    
    if (searchText.trim() === '') {
      setFilteredVideos(playlist.videos);
    } else {
      const filtered = playlist.videos.filter(video => 
        video.title.toLowerCase().includes(searchText) || 
        (video.description && video.description.toLowerCase().includes(searchText))
      );
      setFilteredVideos(filtered);
    }
  };

  // Clear filter
  const clearFilter = () => {
    setFilterText('');
    if (playlist && playlist.videos) {
      setFilteredVideos(playlist.videos);
    }
    
    // Re-focus the search input after clearing
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Add video to watch history
  const addToHistory = (video, playlist) => {
    const history = JSON.parse(localStorage.getItem('videoHistory') || '[]');
    
    // Check if video already exists in history
    const existingIndex = history.findIndex(item => item.videoId === video.id);
    
    // If exists, remove it to add it to the top
    if (existingIndex !== -1) {
      history.splice(existingIndex, 1);
    }
    
    // Add video to the beginning of history
    history.unshift({
      videoId: video.id,
      videoTitle: video.title,
      videoThumbnail: video.thumbnail,
      playlistId: playlist.id,
      playlistTitle: playlist.title,
      timestamp: new Date().toISOString()
    });
    
    // Keep only the most recent 50 items
    const updatedHistory = history.slice(0, 50);
    
    localStorage.setItem('videoHistory', JSON.stringify(updatedHistory));
  };

  // Check if playlist is in favorites
  const checkIfFavorite = (playlistId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFav = favorites.some(fav => fav.id === playlistId);
    setIsFavorite(isFav);
  };

  // Toggle favorite status
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(fav => fav.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      favorites.push({
        id: playlist.id,
        title: playlist.title,
        thumbnail: playlist.thumbnail,
        videoCount: playlist.videos.length,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    setIsFavorite(!isFavorite);
  };

  // Handle video selection
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    addToHistory(video, playlist);
    
    // Update URL with video ID without page reload
    setSearchParams({ video: video.id });
  };

  if (!playlist) {
    return (
      <div className="container">
        <div className="text-center py-5">
          <h2>Loading playlist...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col">
          <h1>{playlist.title}</h1>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="text-muted">{playlist.videos.length} videos</p>
            <button 
              className={`btn ${isFavorite ? "btn-danger" : "btn-outline-danger"}`}
              onClick={toggleFavorite}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-lg-8 mb-4">
          {selectedVideo ? (
            <div className="video-player-container">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
                width="100%"
                height="450px"
                controls
                playing={false}
              />
              <div className="mt-3">
                <h4>{selectedVideo.title}</h4>
                <p className="text-muted small">
                  Duration: {selectedVideo.duration} • Uploaded: {selectedVideo.uploadDate}
                </p>
                <div className="video-description mt-3">
                  {selectedVideo.description}
                </div>
              </div>
            </div>
          ) : (
            <div className="video-player-container d-flex flex-column justify-content-center align-items-center" style={{ height: "450px" }}>
              <h4>Select a video from the playlist</h4>
              <p className="text-muted">Click on any video from the list to start watching</p>
            </div>
          )}
        </div>
        
        <div className="col-lg-4">
          <div className="mb-3">
            <div className="input-group input-group-sm">
              <input
                ref={searchInputRef}
                type="text"
                className="form-control"
                placeholder="Filter videos..."
                value={filterText}
                onChange={handleFilterChange}
                aria-label="Filter videos"
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
          
          {filteredVideos.length === 0 ? (
            <div className="alert alert-info">
              No videos found matching "{filterText}". Try a different search term.
            </div>
          ) : (
            <div className="list-group video-list">
              {filteredVideos.map((video, index) => (
                <button 
                  key={video.id}
                  type="button"
                  className={`list-group-item list-group-item-action d-flex align-items-start ${selectedVideo && selectedVideo.id === video.id ? 'active' : ''}`}
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="me-3 position-relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      width="120" 
                      className="img-fluid rounded"
                    />
                    <span className="position-absolute bottom-0 right-0 bg-dark text-white px-1 rounded small">
                      {video.duration}
                    </span>
                  </div>
                  <div>
                    <p className="mb-1 fw-bold">{video.title}</p>
                    <small>{playlist.videos.indexOf(video) + 1} of {playlist.videos.length}</small>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail; 