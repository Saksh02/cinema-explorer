import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/omdb';

export default function MovieDetails({ toggleWatchlist, isMovieInWatchlist }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError('Could not load movie details.');
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem', color: '#6366f1' }}>Loading movie details...</div>;
  }

  if (error || !movie) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ color: '#ef4444' }}>{error || 'Movie not found.'}</p>
        <button
          onClick={() => navigate('/discover')}
          style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#6366f1', color: '#fff', cursor: 'pointer' }}
        >
          Back to Discover
        </button>
      </div>
    );
  }

  const inWatchlist = isMovieInWatchlist(movie.id);

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: '8px 16px',
          borderRadius: '6px',
          border: '1px solid #cbd5e1',
          background: '#fff',
          cursor: 'pointer',
          marginBottom: '1.5rem'
        }}
      >
        ← Back
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 300px) 1fr', gap: '2rem', background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <div>
          {movie.poster ? (
            <img src={movie.poster} alt={movie.title} style={{ width: '100%', borderRadius: '8px' }} />
          ) : (
            <div style={{ height: '380px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              No Poster
            </div>
          )}
        </div>

        <div>
          <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>{movie.title} ({movie.year})</h2>
          
          <div style={{ display: 'flex', gap: '1rem', color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            <span>⭐ {movie.rating} / 10</span>
            <span>⏱️ {movie.runtime}</span>
            <span>Rated: {movie.rated}</span>
          </div>

          <p style={{ lineHeight: '1.6', color: '#334155', marginBottom: '1.5rem' }}>{movie.plot}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: '#475569', marginBottom: '2rem' }}>
            <p style={{ margin: 0 }}><strong>Genre:</strong> {movie.genre}</p>
            <p style={{ margin: 0 }}><strong>Director:</strong> {movie.director}</p>
            <p style={{ margin: 0 }}><strong>Actors:</strong> {movie.actors}</p>
          </div>

          <button
            onClick={() => toggleWatchlist(movie)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: inWatchlist ? '#ef4444' : '#6366f1',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {inWatchlist ? 'Remove from Watchlist' : '+ Add to Watchlist'}
          </button>
        </div>
      </div>
    </div>
  );
}