const { Op } = require("sequelize");
const TvDb = require("../models").TV;
const GenreDb = require("../models").Genre;

const controller = {
    getLatest: async (req, res) => {
        try {
            const tvs = await TvDb.findAll({
                order: [["created_at", "DESC"]],
                limit: 15,
            });
            res.status(200).send(tvs);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    search: async (req, res) => {
        const limit = 15;
        try {
            let tvs = await TvDb.findAll({
                where: {
                    name: {
                        [Op.like]: req.query.name ? `%${req.query.name}%` : "%%",
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
            const tvCount = await TvDb.count({
                where: {
                    name: {
                        [Op.like]: req.query.name ? `%${req.query.name}%` : "%%",
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
                tvs,
                tvCount,
                limit,
            });
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    filter: async (req, res) => {
        const limit = 15;
        try {
            let tvs = await TvDb.findAll({
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
            const tvCount = await TvDb.count({
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
                tvs,
                tvCount,
                limit,
            });
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    getById: async (req, res) => {
        try {
            const movie = await TvDb.findByPk(req.params.id, {
                include: [GenreDb],
            });
            if (movie) {
                res.status(200).send(movie);
            } else {
                res.status(404).send({ message: "TV not found" });
            }
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    getByList: async (req, res) => {
        let idArray = req.query.idList;
        idArray = idArray.split(",");
        try {
            const tvs = await TvDb.findAll({
                where: {
                    id: {
                        [Op.in]: idArray,
                    },
                },
            });
            res.status(200).send(tvs);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },
};

module.exports = controller;
