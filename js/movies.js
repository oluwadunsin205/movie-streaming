const movieContainer = document.querySelector("#movie-container");

const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get("search");

let apiUrl = "/api/movies";

if (searchTerm) {
  apiUrl = `/api/search?query=${encodeURIComponent(searchTerm)}`;
}

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    movieContainer.innerHTML = "";

    data.results.forEach((movie) => {
      const movieCard = document.createElement("div");

      movieCard.classList.add("movie-card");

      movieCard.innerHTML = `
                <img 
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
                    alt="${movie.title}"
                >

                <h3>${movie.title}</h3>

                <p>⭐ ${Number(movie.vote_average).toFixed(1)}</p>
            `;

      movieContainer.appendChild(movieCard);
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });
