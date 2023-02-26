const { Op } = require("sequelize");
const PersonDb = require("../models").Person;

const controller = {
    search: async (req, res) => {
        const limit = 20;
        try {
            let people = await PersonDb.findAll({
                where: {
                    name: {
                        [Op.like]: req.query.name ? `%${req.query.name}%` : "%%",
                    },
                },
                offset: req.query.page * limit,
                limit: limit,
            });
            const peopleCount = await PersonDb.count({
                where: {
                    name: {
                        [Op.like]: req.query.name ? `%${req.query.name}%` : "%%",
                    },
                },
                distinct: true,
                col: "id",
            });
            res.status(200).send({
                people,
                peopleCount,
                limit,
            });
        } catch (e) {
            res.status(500).send({ message: "Server error" });
        }
    },
};

module.exports = controller;