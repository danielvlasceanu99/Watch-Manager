const MovieDb = require("../models").Movie;

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
};

module.exports = controller;
