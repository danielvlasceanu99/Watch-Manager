const { Op } = require("sequelize");
const ReviewDb = require("../models").Review;

const controller = {
    getReviewsByMovieId: async (req, res) => {
        try {
            const reviews = await ReviewDb.findAll({
                where: {
                    movie_id: req.params.movie_id,
                },
                order: [["created_at", "DESC"]],
            });
            res.status(200).send(reviews);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    getReviewsByTvId: async (req, res) => {
        try {
            const reviews = await ReviewDb.findAll({
                where: {
                    tv_id: req.params.tv_id,
                },
                order: [["created_at", "DESC"]],
            });
            res.status(200).send(reviews);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },
};

module.exports = controller;
