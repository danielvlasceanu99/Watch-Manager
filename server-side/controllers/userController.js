const UserDb = require("../models").Users;

const controller = {
    getAllusers: (req, res) => {
        const name = "Dummy_Name_1";

        UserDb.find({ name: name }, (err, user) => {
            if (err) {
                console.error("Failed to get user", err);
                res.status(500).send("Failed to get user");
                return;
            }
            if (!user) {
                res.status(404).send("User not found");
                return;
            }
            res.status(200).json(user);
        });
    },
};

module.exports = controller;
