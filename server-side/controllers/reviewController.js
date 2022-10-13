const { Op } = require("sequelize");
const MovieReview = require("../models").MovieReview;

const controller = {
    getReviewsByMovieId: async (req, res) => {
        try {
            const reviews = await MovieReview.findAll({
                where: {
                    movie_id: req.params.movie_id,
                },
            });
            res.status(500).send(reviews);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },
};

module.exports = controller;
