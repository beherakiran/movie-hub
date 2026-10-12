const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

const URL = "https://api.themoviedb.org/3";

export async function getPopularMovies() {
  const response = await fetch(
    `${URL}/movie/popular?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  const data = await response.json();

  return data.results;
}

export async function getMovieDetails(movieId) {
    const response = await fetch(
        `${URL}/movie/${movieId}?api_key=${API_KEY}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch movie details");
    }

    const data = await response.json();

    return data;
}  

export async function searchMovies(query) {
    const response = await fetch(
        `${URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );

    if (!response.ok) {
        throw new Error("Failed to search movies");
    }

    const data = await response.json();

    return data.results;
}