const axios = require("axios");
const dotenv = require("dotenv");
const GenreDb = require("../models").Genre;

dotenv.config({ path: "./config.env" });
const key = process.env.API_KEI;

const fetchGenres = async () => {
    try {
        let response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`);
        response.data.genres.forEach(async (genre) => {
            await GenreDb.create(genre)
                .then((genre) => {
                    console.log("Isertd genre ", genre.id);
                })
                .catch((err) => {
                    console.log(err);
                });
        });

        response = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${key}&language=en-US`);
        response.data.genres.forEach(async (genre) => {
            await GenreDb.create(genre)
                .then((genre) => {
                    console.log("Isertd genre ", genre.id);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    } catch (error) {
        console.error("Error fetching and inserting data:", error);
    }
};
module.exports = fetchGenres;
