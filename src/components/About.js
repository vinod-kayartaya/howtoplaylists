import React from 'react';

const About = () => {
  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col">
          <h1 className="mb-4">About "HowTo? Playlists"</h1>
          <p className="lead">
            "HowTo? Playlists" is a platform designed to help you discover, watch, and organize educational YouTube playlists.
            Our goal is to provide a seamless viewing experience for tutorial and educational content without the distractions of YouTube's interface.
          </p>
          <p>
            With "HowTo? Playlists", you can:
          </p>
          <ul>
            <li>Browse a curated collection of educational playlists</li>
            <li>Watch videos directly within our platform</li>
            <li>Save your favorite playlists for easy access</li>
            <li>Keep track of your viewing history</li>
            <li>Enjoy a clean, distraction-free viewing experience</li>
          </ul>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col">
          <h2 className="mb-4">How to Use</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h5">Browse Playlists</h3>
                  <p>
                    Explore our collection of educational playlists on the home page. 
                    Click on any playlist thumbnail to view its contents.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h5">Watch Videos</h3>
                  <p>
                    Videos play directly within our platform. Navigate between videos in a playlist 
                    using the list on the right side of the player.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h5">Save Favorites</h3>
                  <p>
                    Add playlists to your favorites by clicking the "Add to Favorites" button 
                    when viewing a playlist. Access your favorites from the navigation menu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col">
          <h2 className="mb-4">Privacy Information</h2>
          <p>
            "HowTo? Playlists" respects your privacy. We use local storage to save your favorites and viewing history, 
            which means this information is stored only on your device and is not shared with us or any third parties.
          </p>
          <p>
            You can clear your history or favorites at any time from their respective pages.
          </p>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex flex-column flex-md-row align-items-center justify-content-center">
                <div className="mb-3 mb-md-0 me-md-4 text-center">
                  <img 
                    src="https://avatars.githubusercontent.com/u/109946821?v=4" 
                    alt="Vinod's Profile" 
                    className="rounded-circle img-thumbnail" 
                  />
                </div>
                <div className="text-center text-md-start">
                  <h3 className="h4">Vinod Kumar Kayartaya</h3>
                  <p className="mb-2">Developer & Creator</p>
                  <p className="text-muted">
                    "HowTo? Playlists" was designed and developed by Vinod with a passion for creating 
                    distraction-free learning experiences. This application aims to make educational 
                    content more accessible and enjoyable.
                  </p>
                  <div className="d-flex gap-3 justify-content-center justify-content-md-start flex-wrap">
                    <a href="https://vinod.co" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                      <i className="bi bi-globe me-1"></i>Learn with Vinod
                    </a>
                    <a href="https://github.com/vinod-kayartaya" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                      <i className="bi bi-github me-1"></i>GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/javatrainer/" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                      <i className="bi bi-linkedin me-1"></i>LinkedIn
                    </a>
                    <a href="https://www.youtube.com/@learnwithvinod" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                      <i className="bi bi-youtube me-1"></i>YouTube
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 