const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.static("."));

app.get("/api/movies", async (req, res) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`
        );

        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Failed to get movies" });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});