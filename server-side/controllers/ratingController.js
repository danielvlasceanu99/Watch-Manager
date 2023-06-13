const UserDb = require("../models").Users;

const controller = {
    getAverageMovieRating: async (req, res) => {
        const id = req.params.id;

        const pipeline = [
            { $unwind: "$ratedMovies" },
            { $match: { "ratedMovies.id": id } },
            {
                $group: {
                    _id: id,
                    averageScore: { $avg: { $toDouble: `$ratedMovies.rating` } },
                },
            },
        ];

        try {
            const result = await UserDb.aggregate(pipeline).toArray();
            res.status(200).send(result);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },
    getAverageTvRating: async (req, res) => {
        const id = req.params.id;

        const pipeline = [
            { $unwind: "$ratedTv" },
            { $match: { "ratedTv.id": id } },
            {
                $group: {
                    _id: id,
                    averageScore: { $avg: { $toDouble: `$ratedTv.rating` } },
                },
            },
        ];

        try {
            const result = await UserDb.aggregate(pipeline).toArray();
            res.status(200).send(result);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },
};

module.exports = controller;
