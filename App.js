import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  if (selectedMovie) {
    return <MovieDetail movie={selectedMovie} onBack={() => setSelectedMovie(null)} />;
  }

  return <MoviesList movies={movies} onSelectMovie={setSelectedMovie} />;
}

function MoviesList({ movies, onSelectMovie }) {
  return (
    <div className="container">
      <h1>Movies</h1>
      <div className="movies-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card" onClick={() => onSelectMovie(movie)}>
            <h2>{movie.title}</h2>
            <p className="tagline">{movie.tagline}</p>
            <p className="rating">★ {movie.vote_average}/10</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieDetail({ movie, onBack }) {
  const releaseDate = new Date(movie.release_date.split('/').reverse().join('-'));
  
  return (
    <div className="container">
      <button onClick={onBack} className="back-button">← Back to Movies</button>
      <div className="movie-detail">
        <h1>{movie.title}</h1>
        <p><strong>Original Title:</strong> {movie.original_title}</p>
        <p><strong>Tagline:</strong> {movie.tagline}</p>
        <p><strong>Overview:</strong> {movie.overview}</p>
        <p><strong>Release Date:</strong> {releaseDate.toLocaleDateString()}</p>
        <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
        <p><strong>Status:</strong> {movie.status}</p>
        <p><strong>Rating:</strong> {movie.vote_average}/10</p>
        <p><strong>Vote Count:</strong> {movie.vote_count}</p>
        <p><strong>ID:</strong> {movie.id}</p>
      </div>
    </div>
  );
}

export default App;
