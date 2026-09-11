const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.static("."));

app.get("/api/movies", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`,
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Failed to get movies" });
  }
});

app.get("/api/search", async (req, res) => {
    try {
        const query = req.query.query;

        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`
        );

        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.log("Search error:", error);
        res.status(500).json({ error: "Failed to search movies" });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
