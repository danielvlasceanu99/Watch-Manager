const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const secret = process.env.SECRET;

const ObjectId = require("mongodb").ObjectId;
const UserDb = require("../models").Users;

dotenv.config({ path: "./config.env" });

const controller = {
    login: (req, res) => {
        const { email, password } = req.body;

        UserDb.findOne({ email: email }, (err, user) => {
            if (err) {
                res.status(500).send("Failed to get login");
                return;
            }
            if (!user) {
                res.status(400).send({ message: "No account with this email" });
                return;
            }

            console.log(user);
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(500).send({ message: "Server error" });
                    return;
                }

                if (result) {
                    const token = jwt.sign({ email }, secret);
                    res.status(200).send({ token, user });
                } else {
                    res.status(400).send({ message: "Incorect password" });
                    return;
                }
            });
        });
    },
};

module.exports = controller;
