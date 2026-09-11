const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    return;
  }

  window.location.href = `movies.html?search=${encodeURIComponent(searchTerm)}`;
});

const hero = document.querySelector(".hero");

fetch("/api/movies")
  .then((response) => response.json())
  .then((data) => {
    const movie = data.results[4];

    hero.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
  })
  .catch((error) => {
    console.log("Hero error:", error);
  });

const movieContainer = document.querySelector("#movie-container");

fetch("/api/movies")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    data.results.forEach((movie) => {
      const movieCard = document.createElement("div");

      movieCard.classList.add("movie-card");

      movieCard.innerHTML = `
                <img 
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
                    alt="${movie.title}"
                >

                <h3>${movie.title}</h3>

                <p>⭐ ${movie.vote_average.toFixed(1)}</p>
            `;

      movieContainer.appendChild(movieCard);
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });
