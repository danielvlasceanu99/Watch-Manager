const GenreDb = require("../models").Genre;

const controller = {
    getAll: async (req, res) => {
        try {
            const genres = await GenreDb.findAll({
                order: ["name"],
            });
            res.status(200).send(genres);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },
};

module.exports = controller;
