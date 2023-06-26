const { Op, Sequelize } = require("sequelize");
const sequelize = require("../config/dbConfig");
const TvDb = require("../models").TV;
const GenreDb = require("../models").Genre;
const UserDb = require("../models").Users;

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

    search: async (req, res) => {
        const limit = 20;
        try {
            let tvs = await TvDb.findAll({
                where: {
                    name: {
                        [Op.like]: req.query.name ? `%${req.query.name}%` : "%%",
                    },
                },
                include: [
                    {
                        model: GenreDb,
                    },
                ],
                offset: req.query.page * limit,
                limit: limit,
            });
            const tvCount = await TvDb.count({
                where: {
                    name: {
                        [Op.like]: req.query.name ? `%${req.query.name}%` : "%%",
                    },
                },
                include: [
                    {
                        model: GenreDb,
                    },
                ],
                distinct: true,
                col: "id",
            });
            res.status(200).send({
                tvs,
                tvCount,
                limit,
            });
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    filter: async (req, res) => {
        const limit = 20;
        try {
            let tvs = await TvDb.findAll({
                include: [
                    {
                        model: GenreDb,
                        where: {
                            id: {
                                [Op.like]: req.query.genre ? `%${req.query.genre}` : "%%",
                            },
                        },
                    },
                ],
                offset: req.query.page * limit,
                limit: limit,
            });
            const tvCount = await TvDb.count({
                include: [
                    {
                        model: GenreDb,
                        where: {
                            id: {
                                [Op.like]: req.query.genre ? `%${req.query.genre}` : "%%",
                            },
                        },
                    },
                ],
                distinct: true,
                col: "id",
            });
            res.status(200).send({
                tvs,
                tvCount,
                limit,
            });
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    getById: async (req, res) => {
        try {
            const tv = await TvDb.findByPk(req.params.id, {
                include: [GenreDb],
            });
            if (tv) {
                res.status(200).send(tv);
            } else {
                res.status(404).send({ message: "TV not found" });
            }
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    getByList: async (req, res) => {
        let idArray = req.query.idList;
        idArray = idArray.split(",");
        try {
            const tvs = await TvDb.findAll({
                where: {
                    id: {
                        [Op.in]: idArray,
                    },
                },
            });
            res.status(200).send(tvs);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    getRecomandations: async (req, res) => {
        let idArray = req.query.idList;
        idArray = idArray.split(",");

        const querryString =
            "select count(tv.id) as tvCount, genre_to_tv.genre_id from `tvs` as tv join `genre_to_tv` as genre_to_tv  on tv.id = genre_to_tv.tv_id where tv.id in  (" +
            idArray +
            ") GROUP by genre_to_tv.genre_id order by tvCount desc;";

        await sequelize
            .query(querryString, {
                type: Sequelize.QueryTypes.SELECT,
            })
            .then(async (response) => {
                genresId = response
                    .map((item) => {
                        return item.genre_id;
                    })
                    .slice(0, 3);
                let tvs = await TvDb.findAll({
                    include: [
                        {
                            model: GenreDb,
                            where: {
                                id: {
                                    [Op.in]: genresId,
                                },
                            },
                        },
                    ],
                });
                res.status(200).send(tvs);
            })
            .catch((error) => {
                res.status(500).send({ message: "Server error" });
            });
    },

    getTopTv: async (req, res) => {
        const pipeline = [
            { $unwind: "$ratedTv" },
            {
                $group: {
                    _id: "$ratedTv.id",
                    averageScore: { $avg: { $toDouble: "$ratedTv.rating" } },
                },
            },
            { $sort: { averageScore: -1, _id: 1 } },
            { $limit: 10 },
        ];

        try {
            const result = await UserDb.aggregate(pipeline).toArray();
            console.log("here");
            let tvId = result.map((element) => element._id);
            const tv = await TvDb.findAll({
                where: {
                    id: {
                        [Op.in]: tvId,
                    },
                },
            });
            tv.sort((a, b) => tvId.indexOf(a.id) - tvId.indexOf(b.id));
            res.status(200).send(tv);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },
};

module.exports = controller;
