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
};

module.exports = controller;
