import { toggleFavorite, getFavorites } from "./favorites.js";

export function showMovies(movies, onMovieClick) {
  const container = document.getElementById("moviesContainer");

  const favorites = getFavorites();

  container.innerHTML = movies
    .map((movie) => {
      const isFavorite = favorites.some((favorite) => favorite.id === movie.id);
      return `
    <div class="movie-card cursor-pointer overflow-hidden rounded-xl bg-[#1b1f2a] hover:-translate-y-1 transition duration-300">

        <div class="relative">

            <img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                alt="${movie.title}"
                class="aspect-2/3 w-full object-cover"
            >

            <button
                class="favorite-btn absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-2xl ${isFavorite ? "text-red-500" : "text-white"}"
            >
                ${isFavorite ? "♥" : "♡"}
            </button>

        </div>

        <div class="p-4">

            <h3 class="font-semibold text-white">
                ${movie.title}
            </h3>

            <p class="mt-2 text-gray-400">
                ⭐ ${movie.vote_average.toFixed(1)}
            </p>

        </div>

    </div>
`;
    })
    .join("");

  const favoriteButtons = document.querySelectorAll(".favorite-btn");

  favoriteButtons.forEach((button, index) => {
    button.addEventListener("click", (event) => {

    event.stopPropagation();

    const movie = movies[index];

    toggleFavorite(movie);

    showMovies(movies, onMovieClick);

});
  });

  const movieCards = document.querySelectorAll(".movie-card");

  movieCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      const movie = movies[index];

      onMovieClick(movie);
    });
  });
}

export function showMovieModal(movie) {
  const modal = document.getElementById("movieModal");
  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = `
        <div class="flex flex-col gap-6 md:flex-row">

            <img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                alt="${movie.title}"
                class="mx-auto w-40 rounded-lg md:mx-0 md:w-1/3"
            >

            <div>
                <h2 class="text-2xl font-bold md:text-3xl">
                    ${movie.title}
                </h2>

                <p class="mt-3 text-gray-400">
                    ${movie.overview}
                </p>

                <p class="mt-4">
                    <strong>Release Date:</strong>
                    ${movie.release_date}
                </p>

                <p class="mt-2">
                    <strong>Rating:</strong>
                    ⭐ ${movie.vote_average.toFixed(1)}
                </p>

                <p class="mt-2">
                    <strong>Genres:</strong>
                    ${movie.genres.map((genre) => genre.name).join(", ")}
                </p>
            </div>

        </div>
    `;

 modal.classList.remove("hidden");
modal.classList.add("flex");
}
