const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com/';

const POPULAR_TITLES = [
  'Inception',
  'Interstellar',
  'The Dark Knight',
  'Avengers: Endgame',
  'Spider-Man: Into the Spider-Verse',
  'Dune: Part One',
  'Goodfellas',
  'Oppenheimer',
  'Gladiator',
  'The Matrix'
];

export async function searchMovies(query, page = 1) {
  const cleanQuery = query ? query.trim() : '';
  if (!cleanQuery) return getPopularMovies();

  try {
    const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(cleanQuery)}&type=movie&page=${page}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    if (data.Response === 'False') {
      return { results: [], totalResults: 0, error: data.Error || 'No movies found.' };
    }

    const searchResults = Array.isArray(data.Search) ? data.Search : [];

    const results = searchResults.map((item) => ({
      id: item.imdbID,
      title: item.Title,
      year: item.Year,
      poster: item.Poster && item.Poster !== 'N/A' ? item.Poster : null,
    }));

    return { results, totalResults: parseInt(data.totalResults, 10) || 0 };
  } catch (error) {
    console.error('OMDb Search Error:', error);
    throw error;
  }
}

export async function getMovieDetails(id) {
  try {
    const url = `${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(id)}&plot=full`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Movie details not found.');
    }

    return {
      id: data.imdbID,
      title: data.Title,
      year: data.Year,
      rated: data.Rated,
      released: data.Released,
      runtime: data.Runtime,
      genre: data.Genre,
      director: data.Director,
      writer: data.Writer,
      actors: data.Actors,
      plot: data.Plot,
      poster: data.Poster && data.Poster !== 'N/A' ? data.Poster : null,
      rating: data.imdbRating,
      votes: data.imdbVotes,
    };
  } catch (error) {
    console.error('OMDb Details Error:', error);
    throw error;
  }
}

export async function getPopularMovies() {
  try {
    const fetchPromises = POPULAR_TITLES.map((title) =>
      fetch(`${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}`)
        .then((res) => res.json())
    );

    const responses = await Promise.all(fetchPromises);

    const results = responses
      .filter((item) => item.Response === 'True')
      .map((item) => ({
        id: item.imdbID,
        title: item.Title,
        year: item.Year,
        poster: item.Poster && item.Poster !== 'N/A' ? item.Poster : null,
      }));

    return { results, totalResults: results.length };
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return { results: [], totalResults: 0 };
  }
}