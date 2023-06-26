const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const ReviewDb = require("../models").Review;
const MovieDb = require("../models").Movie;
const TvDb = require("../models").TV;

const ObjectId = require("mongodb").ObjectId;
const UserDb = require("../models").Users;

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

    getReviewsByUserId: async (req, res) => {
        try {
            const reviews = await ReviewDb.findAll({
                include: [
                    { model: MovieDb, attributes: ["id", "title"] },
                    { model: TvDb, attributes: ["id", "name"] },
                ],
                where: {
                    created_by: req.params.user_id,
                },
                order: [["created_at", "DESC"]],
            });
            res.status(200).send(reviews);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    addReview: async (req, res) => {
        const token = req.headers["authorization"];
        if (!token) {
            res.status(401).send({ message: "No token provided" });
        }

        const review = req.body;
        console.log(review);
        let errors = {};
        try {
            errors = await validateReview(review, token);
        } catch {
            res.status(401).send({ message: "Invalid token" });
        }

        if (Object.keys(errors).length !== 0) {
            res.status(400).send(errors);
        } else {
            const user = await UserDb.findOne({ _id: ObjectId(jwt.verify(token, secret).user._id) });
            const newReview = {
                id: user._id.toString() + Date.now(),
                title: review.title,
                content: review.content,
                user_name: user.name,
                media_type: review.mediaType,
                created_by: user._id.toString(),
                last_changed_by: user._id.toString(),
            };
            if (review.mediaType === "movie") {
                newReview.movie_id = review.mediaId;
            }
            if (review.mediaType === "tv") {
                newReview.tv_id = review.mediaId;
            }

            await ReviewDb.create(newReview)
                .then((response) => {
                    res.status(200).send(response);
                })
                .catch(() => {
                    res.status(500).send({ message: "Failed to add review" });
                });
        }
    },
};

validateReview = async (newReview, token) => {
    const errors = {};
    if (!newReview.title) {
        errors.title = "Missing title";
    }
    if (!newReview.content) {
        errors.content = "Missing content";
    }
    if (!newReview.mediaType) {
        errors.mediaType = "Missing media type";
    }
    if (!newReview.mediaId) {
        errors.mediaId = "Missing media Id";
    } else if (newReview.mediaType === "movie") {
        const media = await MovieDb.findByPk(newReview.mediaId);
        console.log("HERE");
        if (!media) {
            errors.mediaId = "No movie with this Id";
        }
    } else if (newReview.mediaType === "tv") {
        const media = await TvDb.findByPk(newReview.mediaId);
        if (!media) {
            errors.mediaId = "No tv with this Id";
        }
    }
    const user = await UserDb.findOne({ _id: ObjectId(jwt.verify(token, secret).user._id) });
    if (!user) {
        errors.user = "There is no such account";
    }
    return errors;
};

module.exports = controller;
