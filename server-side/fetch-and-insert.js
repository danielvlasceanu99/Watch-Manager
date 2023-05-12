const axios = require("axios");
const dotenv = require("dotenv");
const MovieDb = require("./models").Movie;

dotenv.config({ path: "./config.env" });
const key = process.env.API_KEI;

const idArray = ["238", "155", "429", "122", "157336"];

const fetchData = async () => {
    idArray.forEach(async (id) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`);

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
                created_by: "1",
                last_changed_at: new Date(),
                last_changed_by: "1",
                poster_path: `https://image.tmdb.org/t/p/w500/${response.data.poster_path}`,
            };

            await MovieDb.create(movie)
                .then((movie) => {
                    console.log("Isertd movie ", movie.id);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.error("Error fetching and inserting data:", error);
        }
    });
};

fetchData();
