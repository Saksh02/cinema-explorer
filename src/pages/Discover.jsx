import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../services/omdb';
import { useDebounce } from '../hooks/useDebounce';

export default function Discover({ toggleWatchlist, isMovieInWatchlist }) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedQuery = useDebounce(searchTerm, 500);

  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError(null);
      try {
        const data = await searchMovies(debouncedQuery, page);
        setMovies(data.results || []);
        setTotalResults(data.totalResults || 0);
        if (data.error) setError(data.error);
      } catch (err) {
        setError('Failed to fetch movies. Check your network or API key.');
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [debouncedQuery, page]);

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Search movies (e.g. Inception, Batman)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {loading && <div style={{ textAlign: 'center', padding: '2rem', color: '#6366f1' }}>Loading...</div>}
      {error && <div style={{ color: '#ef4444', textAlign: 'center', padding: '1rem' }}>{error}</div>}

      {!loading && !error && movies.length > 0 && (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}
          >
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                toggleWatchlist={toggleWatchlist}
                inWatchlist={isMovieInWatchlist(movie.id)}
              />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  background: page <= 1 ? '#f1f5f9' : '#fff',
                  cursor: page <= 1 ? 'not-allowed' : 'pointer',
                  color: page <= 1 ? '#94a3b8' : '#334155'
                }}
              >
                Previous
              </button>

              <span style={{ fontSize: '0.9rem', color: '#64748b' }}>
                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  background: page >= totalPages ? '#f1f5f9' : '#fff',
                  cursor: page >= totalPages ? 'not-allowed' : 'pointer',
                  color: page >= totalPages ? '#94a3b8' : '#334155'
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {!loading && !error && movies.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>No movies found. Try another search.</div>
      )}
    </div>
  );
}