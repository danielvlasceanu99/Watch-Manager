const { Op } = require("sequelize");
const PersonDb = require("../models").Person;
const CreditDb = require("../models").MovieCredit;

const controller = {
    getCastByMovieId: async (req, res) => {
        try {
            const cast = await CreditDb.findAll({
                include: [PersonDb],
                where: {
                    movie_id: req.params.movie_id,
                },
            });
            res.status(200).send(cast);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },
};

module.exports = controller;
