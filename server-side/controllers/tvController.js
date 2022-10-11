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
            res.status(201).send(tvs);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },
};

module.exports = controller;
