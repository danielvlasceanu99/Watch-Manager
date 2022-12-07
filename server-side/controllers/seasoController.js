const EpisodeDb = require("../models").Episode;
const SeasonDb = require("../models").Season;

const controller = {
    getSeasonsByTvId: async (req, res) => {
        try {
            const seasons = await SeasonDb.findAll({
                where: { tv_id: req.params.tv_id },
                include: [EpisodeDb],
            });

            res.status(200).send(seasons);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },
};

module.exports = controller;
