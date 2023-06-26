const { Op, Sequelize } = require("sequelize");
const sequelize = require("../config/dbConfig");
const MovieDb = require("../models").Movie;
const GenreDb = require("../models").Genre;
const UserDb = require("../models").Users;

const controller = {
    getLatest: async (req, res) => {
        try {
            const movies = await MovieDb.findAll({
                order: [["created_at", "DESC"]],
                limit: 15,
            });
            res.status(200).send(movies);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    search: async (req, res) => {
        const limit = 20;
        try {
            let movies = await MovieDb.findAll({
                where: {
                    title: {
                        [Op.like]: req.query.title ? `%${req.query.title}%` : "%%",
                    },
                },
                include: [
                    {
                        model: GenreDb,
                    },
                ],
                offset: req.query.page * limit,
                limit: limit,
            });
            const movieCount = await MovieDb.count({
                where: {
                    title: {
                        [Op.like]: req.query.title ? `%${req.query.title}%` : "%%",
                    },
                },
                include: [
                    {
                        model: GenreDb,
                    },
                ],
                distinct: true,
                col: "id",
            });
            res.status(200).send({
                movies,
                movieCount,
                limit,
            });
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    filter: async (req, res) => {
        const limit = 20;
        try {
            let movies = await MovieDb.findAll({
                include: [
                    {
                        model: GenreDb,
                        where: {
                            id: {
                                [Op.like]: req.query.genre ? `%${req.query.genre}` : "%%",
                            },
                        },
                    },
                ],
                offset: req.query.page * limit,
                limit: limit,
            });
            const movieCount = await MovieDb.count({
                include: [
                    {
                        model: GenreDb,
                        where: {
                            id: {
                                [Op.like]: req.query.genre ? `%${req.query.genre}` : "%%",
                            },
                        },
                    },
                ],
                distinct: true,
                col: "id",
            });
            res.status(200).send({
                movies,
                movieCount,
                limit,
            });
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    getById: async (req, res) => {
        try {
            const movie = await MovieDb.findByPk(req.params.id, {
                include: [GenreDb],
            });
            if (movie) {
                res.status(200).send(movie);
            } else {
                res.status(404).send({ message: "Movie not found" });
            }
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    getByList: async (req, res) => {
        let idArray = req.query.idList;
        idArray = idArray.split(",");
        try {
            const movies = await MovieDb.findAll({
                where: {
                    id: {
                        [Op.in]: idArray,
                    },
                },
            });
            res.status(200).send(movies);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    getRecomandations: async (req, res) => {
        let idArray = req.query.idList;
        idArray = idArray.split(",");

        const querryString =
            "select count(movies.id) as movieCount, genre_to_movie.genre_id  from `movies` as movies join `genre_to_movie` as genre_to_movie on movies.id = genre_to_movie.movie_id where movies.id in (" +
            idArray +
            ") GROUP by genre_to_movie.genre_id order by movieCount desc;";

        await sequelize
            .query(querryString, {
                type: Sequelize.QueryTypes.SELECT,
            })
            .then(async (response) => {
                genresId = response
                    .map((item) => {
                        return item.genre_id;
                    })
                    .slice(0, 3);
                let movies = await MovieDb.findAll({
                    include: [
                        {
                            model: GenreDb,
                            where: {
                                id: {
                                    [Op.in]: genresId,
                                },
                            },
                        },
                    ],
                });
                res.status(200).send(movies);
            })
            .catch((error) => {
                res.status(500).send({ message: "Server error" });
            });
    },

    getAll: async (req, res) => {
        try {
            const movies = await MovieDb.findAll({
                order: [["created_at", "DESC"]],
            });
            res.status(200).send(movies);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    addMovie: async (req, res) => {
        const movie = {
            id: req.body.movie.title + Date.now(),
            title: req.body.movie.title,
            tagline: req.body.movie.tagline,
            overview: req.body.movie.overview,
            runtime: req.body.movie.runtime,
            release_date: req.body.movie.release_date,
            status: req.body.movie.status,
            budget: req.body.movie.budget,
            revenue: req.body.movie.revenue,
            poster_path: req.body.movie.poster_path,
            created_by: req.user._id.toString(),
            last_changed_by: req.user._id.toString(),
            created_at: new Date(Date.now()),
            last_changed_at: new Date(Date.now()),
        };

        let errors = validateMovie(movie);
        if (Object.keys(errors).length === 0) {
            await MovieDb.create(movie)
                .then((movie) => {
                    res.status(200).send(movie);
                })
                .catch((err) => {
                    res.status(500).send({ message: "Server error" });
                });
        } else {
            res.status(400).send(errors);
        }
    },

    editMovie: async (req, res) => {
        const movie = await MovieDb.findByPk(req.params.id);
        if (!movie) {
            res.status(404).send({ message: "No movie with that id" });
        }

        const newMovie = {
            title: req.body.movie.title,
            tagline: req.body.movie.tagline,
            overview: req.body.movie.overview,
            runtime: req.body.movie.runtime,
            release_date: req.body.movie.release_date,
            status: req.body.movie.status,
            budget: req.body.movie.budget,
            revenue: req.body.movie.revenue,
            poster_path: req.body.movie.poster_path,
            created_by: req.user._id.toString(),
            last_changed_by: req.user._id.toString(),
            created_at: new Date(Date.now()),
            last_changed_at: new Date(Date.now()),
        };

        let errors = validateMovie(newMovie);
        if (Object.keys(errors).length === 0) {
            await movie
                .update(newMovie)
                .then((movie) => {
                    res.status(200).send(movie);
                })
                .catch(() => {
                    res.status(500).send({ message: "Server error" });
                });
        } else {
            res.status(400).send(errors);
        }
    },

    deleteMovie: async (req, res) => {
        const movie = await MovieDb.findByPk(req.params.id);
        if (!movie) {
            res.status(404).send({ message: "No movie with that id" });
        }

        try {
            await movie.destroy();
            res.status(200).send({ message: "Movie removed" });
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    getTopMovies: async (req, res) => {
        const pipeline = [
            { $unwind: "$ratedMovies" },
            {
                $group: {
                    _id: "$ratedMovies.id",
                    averageScore: { $avg: { $toDouble: "$ratedMovies.rating" } },
                },
            },
            { $sort: { averageScore: -1, _id: 1 } },
            { $limit: 10 },
        ];

        try {
            const result = await UserDb.aggregate(pipeline).toArray();
            let moviesId = result.map((element) => element._id);
            const movies = await MovieDb.findAll({
                where: {
                    id: {
                        [Op.in]: moviesId,
                    },
                },
            });
            movies.sort((a, b) => moviesId.indexOf(a.id) - moviesId.indexOf(b.id));
            res.status(200).send(movies);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },
};

const validateMovie = async (movie) => {
    const errors = {};

    if (!movie.title) {
        errors.title = "Missing title";
    } else if (movie.title.length > 100) {
        errors.title = "Title too long";
    }

    if (movie.tagline && movie.tagline.length > 150) {
        errors.tagline = "Tagline too long";
    }

    if (movie.overview && movie.overview.length > 1000) {
        errors.overview = "Overview too long";
    }

    if (movie.runtime && movie.runtime < 0) {
        errors.runtime = "Runtime is negative";
    }

    if (!movie.status) {
        errors.status = "Missing status";
    } else {
        const avaibleStatus = ["Rumored", "Planned", "In Production", "Post Production", "Released", "Canceled"];
        if (!avaibleStatus.includes(movie.status)) {
            errors.status = "Invalid status";
        }
    }

    if (movie.budget && movie.budget < 0) {
        errors.budget = "Budget is negative";
    }

    if (!movie.poster_path) {
        errors.poster_path = "Poster path is missing";
    }

    return errors;
};

module.exports = controller;
