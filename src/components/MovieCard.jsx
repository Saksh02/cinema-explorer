import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie, toggleWatchlist, inWatchlist }) {
  return (
    <div
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            style={{ width: '100%', height: '260px', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ height: '260px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
            No Poster
          </div>
        )}
      </Link>

      <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3 style={{ fontSize: '0.95rem', margin: '0 0 0.25rem 0', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {movie.title}
            </h3>
          </Link>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
            {movie.year}
          </div>
        </div>

        <button
          onClick={() => toggleWatchlist(movie)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid',
            borderColor: inWatchlist ? '#ef4444' : '#6366f1',
            background: inWatchlist ? '#fef2f2' : '#eef2ff',
            color: inWatchlist ? '#ef4444' : '#6366f1',
            fontSize: '0.8rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          {inWatchlist ? 'Remove' : '+ Watchlist'}
        </button>
      </div>
    </div>
  );
}