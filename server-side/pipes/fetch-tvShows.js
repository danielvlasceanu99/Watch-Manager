const axios = require("axios");
const dotenv = require("dotenv");
const TvDb = require("../models").TV;
const SeasonDb = require("../models").Season;
const EpisodeDb = require("../models").Episode;

const sequelize = require("../config/dbConfig");
const { Sequelize } = require("sequelize");

dotenv.config({ path: "./config.env" });
const key = process.env.API_KEI;

const fetchTvShows = async () => {
    // const latest = await axios.get(`https://api.themoviedb.org/3/tv/latest?api_key=${key}&language=en-US`);

    // for (let i = 100; i <= latest.data.id; i++) {
    for (let i = 1000; i <= 1500; i++) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${i}?api_key=${key}&language=en-US`);
            const networks = [
                "ABC",
                "BBC",
                "NBC",
                "GMA Network",
                "CBS",
                "FOX",
                "USA Network",
                "Network Ten",
                "HBO",
                "Comedy Central",
            ];
            const tv = {
                id: response.data.id,
                name: response.data.name,
                tagline: response.data.tagline,
                overview: response.data.overview,
                first_air_date: new Date(response.data.first_air_date),
                in_production: response.data.in_production,
                network: networks[response.data.id % 10],
                created_at: new Date(),
                created_by: "auto-inserter",
                last_changed_at: new Date(),
                last_changed_by: "auto-inserter",
                poster_path: `https://image.tmdb.org/t/p/w500/${response.data.poster_path}`,
            };

            if (response.data.overview && response.data.first_air_date && response.data.poster_path) {
                await TvDb.create(tv)
                    .then(async (tv) => {
                        console.log("Isertd tv ", tv.id);
                        await fetchSeasons(tv.id, response.data.seasons);
                        await insertGenres(tv.id, response.data.genres);
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

const fetchSeasons = async (tvId, seasons) => {
    seasons.forEach(async (season) => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/tv/${tvId}/season/${season.season_number}?api_key=${key}&language=en-US`
            );

            const season_created = {
                id: response.data.id,
                tv_id: tvId,
                name: response.data.name,
                overview: response.data.overview,
                season_number: response.data.season_number,
                air_date: new Date(response.data.air_date),
                created_at: new Date(),
                created_by: "auto-inserter",
                last_changed_at: new Date(),
                last_changed_by: "auto-inserter",
                poster_path: `https://image.tmdb.org/t/p/w500/${response.data.poster_path}`,
            };

            if (response.data.air_date && response.data.poster_path) {
                await SeasonDb.create(season_created)
                    .then(async (season) => {
                        console.log("Isertd season ", season.id);
                        await fetchEpisodes(season.id, response.data.episodes);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } catch (error) {
            console.error("Error fetching and inserting data:", error);
        }
    });
};

const fetchEpisodes = async (seasonId, episodes) => {
    episodes.forEach(async (episode) => {
        try {
            const episode_created = {
                id: episode.id,
                episode_number: episode.episode_number,
                season_id: seasonId,
                name: episode.name,
                overview: episode.overview,
                air_date: new Date(episode.air_date),
                created_at: new Date(),
                created_by: "auto-inserter",
                last_changed_at: new Date(),
                last_changed_by: "auto-inserter",
                poster_path: `https://image.tmdb.org/t/p/w500/${episode.still_path}`,
            };

            if (episode.overview && episode.air_date && episode.still_path) {
                await EpisodeDb.create(episode_created)
                    .then((episode) => {
                        console.log("Isertd episode ", episode.id);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } catch (error) {
            console.error("Error fetching and inserting data:", error);
        }
    });
};

const insertGenres = async (tvId, genres) => {
    genres.forEach(async (genre) => {
        await sequelize
            .query("INSERT INTO `genre_to_tv` ( `tv_id`, `genre_id`) VALUES ('" + tvId + "', '" + genre.id + "');", {
                type: Sequelize.QueryTypes.INSERT,
            })
            .then((results) => {
                console.log(results);
            })
            .catch((error) => {
                res.status(500).send({ message: "Server error" });
            });
    });
};

module.exports = fetchTvShows;
