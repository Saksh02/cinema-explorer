import React from 'react';
import MovieCard from '../components/MovieCard';

export default function Watchlist({ watchlist, toggleWatchlist, isMovieInWatchlist }) {
  if (watchlist.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#94a3b8' }}>
        <h3>Your watchlist is empty</h3>
        <p style={{ fontSize: '0.9rem' }}>Go to Discover and add some films!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#334155' }}>Your Saved Watchlist</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {watchlist.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            toggleWatchlist={toggleWatchlist}
            inWatchlist={isMovieInWatchlist(movie.id)}
          />
        ))}
      </div>
    </div>
  );
}