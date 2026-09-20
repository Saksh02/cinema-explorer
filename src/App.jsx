import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Discover from './pages/Discover';
import MovieDetails from './pages/MovieDetails';
import Watchlist from './pages/Watchlist';

export default function App() {

  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('filmatlas_watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('filmatlas_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (movie) => {
    setWatchlist((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      if (exists) {
        return prev.filter((item) => item.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const isMovieInWatchlist = (id) => watchlist.some((item) => item.id === id);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif', color: '#1e293b' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <NavLink to="/discover" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 style={{ fontSize: '2rem', margin: '0 0 0.25rem 0' }}>FilmSeneca 🎬</h1>
          </NavLink>
          <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Discover and track your favorite films</p>
        </div>

        <nav style={{ display: 'flex', gap: '0.5rem' }}>
          <NavLink
            to="/discover"
            style={({ isActive }) => ({
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              background: isActive ? '#6366f1' : '#f1f5f9',
              color: isActive ? '#fff' : '#64748b'
            })}
          >
            Discover
          </NavLink>

          <NavLink
            to="/watchlist"
            style={({ isActive }) => ({
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              background: isActive ? '#6366f1' : '#f1f5f9',
              color: isActive ? '#fff' : '#64748b'
            })}
          >
            Watchlist ({watchlist.length})
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/discover" replace />} />
        <Route 
          path="/discover" 
          element={<Discover toggleWatchlist={toggleWatchlist} isMovieInWatchlist={isMovieInWatchlist} />} 
        />
        <Route 
          path="/movie/:id" 
          element={<MovieDetails toggleWatchlist={toggleWatchlist} isMovieInWatchlist={isMovieInWatchlist} />} 
        />
        <Route 
          path="/watchlist" 
          element={<Watchlist watchlist={watchlist} toggleWatchlist={toggleWatchlist} isMovieInWatchlist={isMovieInWatchlist} />} 
        />
      </Routes>
    </div>
  );
}