const { Op } = require("sequelize");
const PersonDb = require("../models").Person;
const MovieDb = require("../models").Movie;
const TVDb = require("../models").TV;
const CreditDb = require("../models").Credit;

const controller = {
    getCreditsByMovieId: async (req, res) => {
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

    getCreditsByTvId: async (req, res) => {
        try {
            const cast = await CreditDb.findAll({
                include: [PersonDb],
                where: {
                    tv_id: req.params.tv_id,
                },
            });
            res.status(200).send(cast);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    getCreditsByPersonId: async (req, res) => {
        try {
            const cast = await CreditDb.findAll({
                include: [MovieDb, TVDb],
                where: {
                    person_id: req.params.person_id,
                },
            });
            res.status(200).send(cast);
        } catch (e) {
            console.error(e);
            res.status(500).send({ message: "Server error" });
        }
    },
};

module.exports = controller;
