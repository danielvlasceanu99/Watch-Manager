const { Op } = require("sequelize");
const MovieDb = require("../models").Movie;
const GenreDb = require("../models").Genre;

const controller = {
    getLatest: async (req, res) => {
        try {
            const movies = await MovieDb.findAll({
                order: [["created_at", "DESC"]],
                limit: 15,
            });
            res.status(201).send(movies);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    get: async (req, res) => {
        const limit = 5;
        try {
            let movies = await MovieDb.findAll({
                where: {
                    title: {
                        [Op.like]: req.query.title ? `%${req.query.title}` : "%%",
                    },
                },
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
                offset: (req.query.page - 1) * limit,
                limit: limit,
            });
            const movieCount = await MovieDb.count({
                where: {
                    title: {
                        [Op.like]: req.query.title ? `%${req.query.title}` : "%%",
                    },
                },
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
            res.status(201).send({
                movies,
                movieCount,
            });
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },
};

module.exports = controller;
