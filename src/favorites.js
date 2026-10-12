let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

export function toggleFavorite(movie) {
    const exists = favorites.some((fav) => fav.id === movie.id);

    if (exists) {
        favorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
        favorites.push(movie);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    return favorites;
}

export function getFavorites() {
    return favorites;
}