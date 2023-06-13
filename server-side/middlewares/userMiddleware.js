const jwt = require("jsonwebtoken");

const ObjectId = require("mongodb").ObjectId;
const UserDb = require("../models").Users;

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const secret = process.env.SECRET;

const middleware = {
    userMiddleware: async (req, res, next) => {
        const token = req.headers["authorization"];
        if (!token) {
            res.status(401).send({ message: "No token provided" });
        }

        try {
            const user = await UserDb.findOne({ _id: ObjectId(jwt.verify(token, secret).user._id) });
            if (!user) {
                res.status(404).send({ message: "There is no such account" });
            }
            req.user = user;

            next();
        } catch {
            res.status(401).send({ message: "Invalid token" });
        }
    },
};

module.exports = middleware;
