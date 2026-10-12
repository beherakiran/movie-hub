import "./assets/style.css";

import { getPopularMovies, getMovieDetails, searchMovies } from "./api.js";

import { showMovies, showMovieModal } from "./ui.js";

getPopularMovies()
  .then((movies) => {
    showMovies(movies, (movie) => {
      getMovieDetails(movie.id)
        .then((details) => {
          showMovieModal(details);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  })
  .catch((error) => {
    console.error(error);
  });

const modal = document.getElementById("movieModal");
const closeModal = document.getElementById("closeModal");

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();

  if (query === "") {
    getPopularMovies().then((movies) => {
      showMovies(movies, (movie) => {
        getMovieDetails(movie.id).then((details) => {
          showMovieModal(details);
        });
      });
    });

    return;
  }

  searchMovies(query)
    .then((movies) => {
      showMovies(movies, (movie) => {
        getMovieDetails(movie.id).then((details) => {
          showMovieModal(details);
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
});
