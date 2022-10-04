const connection = require("../models").connection;

const controller = {
    reset: (req, res) => {
        connection
            .sync({ force: true })
            .then(() => {
                res.status(200).send({ message: "SQL DB reseted" });
            })
            .catch(() => {
                res.status(500).send({ message: "Server error" });
            });
    },
};

module.exports = controller;
