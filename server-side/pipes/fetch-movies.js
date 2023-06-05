const axios = require("axios");
const dotenv = require("dotenv");
const MovieDb = require("../models").Movie;

const sequelize = require("../config/dbConfig");
const { Sequelize } = require("sequelize");

dotenv.config({ path: "./config.env" });
const key = process.env.API_KEI;

const fetchMovies = async () => {
    // const latest = await axios.get(`https://api.themoviedb.org/3/movie/latest?api_key=${key}&language=en-US`);

    // for (let i = 100; i <= latest.data.id; i++) {
    for (let i = 100; i <= 1000; i++) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${i}?api_key=${key}&language=en-US`);
            const movie = {
                id: response.data.id,
                title: response.data.title,
                tagline: response.data.tagline,
                overview: response.data.overview,
                runtime: response.data.runtime,
                release_date: new Date(response.data.release_date),
                status: response.data.status,
                budget: response.data.budget,
                revenue: response.data.revenue,
                created_at: new Date(),
                created_by: "auto-inserter",
                last_changed_at: new Date(),
                last_changed_by: "auto-inserter",
                poster_path: `https://image.tmdb.org/t/p/w500/${response.data.poster_path}`,
            };

            let isReleasedWithDate = true;
            if (response.data.status === "Released") {
                if (!response.data.release_date) {
                    isReleasedWithDate = false;
                }
            }
            if (response.data.overview && response.data.runtime && response.data.poster_path && isReleasedWithDate) {
                await MovieDb.create(movie)
                    .then(async (movie) => {
                        console.log("Iserted movie ", movie.id);
                        await insertGenres(movie.id, response.data.genres);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } catch (error) {
            console.error("Error fetching and inserting data:", error);
        }
    }
};

const insertGenres = async (movieId, genres) => {
    genres.forEach(async (genre) => {
        await sequelize
            .query(
                "INSERT INTO `genre_to_movie` ( `movie_id`, `genre_id`) VALUES ('" +
                    movieId +
                    "', '" +
                    genre.id +
                    "');",
                {
                    type: Sequelize.QueryTypes.INSERT,
                }
            )
            .then((results) => {
                console.log(results);
            })
            .catch((error) => {
                res.status(500).send({ message: "Server error" });
            });
    });
};

module.exports = fetchMovies;
