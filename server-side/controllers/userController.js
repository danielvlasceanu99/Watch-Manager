const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const secret = process.env.SECRET;

const ObjectId = require("mongodb").ObjectId;
const UserDb = require("../models").Users;

dotenv.config({ path: "./config.env" });

const controller = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await UserDb.findOne({ email: email });
            if (!user) {
                res.status(404).send({ message: "No account with this email" });
                return;
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(500).send({ message: "Server error" });
                    return;
                }

                if (result) {
                    const token = jwt.sign({ user }, secret);
                    res.status(200).send({ token, user });
                } else {
                    res.status(400).send({ message: "Incorect password" });
                    return;
                }
            });
        } catch {
            res.status(500).send({ message: "Failed to login" });
        }
    },

    getUserData: (req, res) => {
        const token = req.headers["authorization"];
        if (!token) return res.status(401).send({ message: "No token provided" });

        try {
            const decodedUser = jwt.verify(token, secret);
            res.status(200).send({ decodedUser });
        } catch (err) {
            res.status(401).send({ message: "Invalid token" });
        }
    },

    register: async (req, res) => {
        const user = {
            role: "user",
            movieWatchlist: [],
            tvWatchlist: [],
            watchedMovies: [],
            watchedEpisodes: [],
            ratedMovies: [],
            ratedTv: [],
            reviewedMovies: [],
            reviewedTv: [],
            likedMovies: [],
            likedTv: [],
        };

        const errors = await validateUser(req.body);
        if (Object.keys(errors).length === 0) {
            user.name = `${req.body.firstName} ${req.body.lastName}`;
            user.email = req.body.email;

            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                if (err) {
                    res.status(500).send("Failed to register");
                    return;
                }
                user.password = hashedPassword;
                try {
                    await UserDb.insertOne(user);
                    res.status(200).send({ message: "Registered" });
                } catch {
                    res.status(500).send("Failed to register");
                }
            });
        } else {
            res.status(400).send(errors);
        }
    },
};

const validateUser = async (newUser) => {
    const errors = {};

    if (!newUser.firstName) {
        errors.firstName = "Missing first name";
    } else if (!newUser.firstName.length > 50) {
        errors.firstName = "First name too long";
    } else if (!newUser.firstName.match("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")) {
        errors.firstName = "Invalid first name";
    }

    if (!newUser.lastName) {
        errors.lastName = "Missing last name";
    } else if (!newUser.lastName.length > 50) {
        errors.lastName = "Last name too long";
    } else if (!newUser.lastName.match("^[a-zA-Z]+(([', -][a-zA-Z ])?[a-zA-Z]*)*$")) {
        errors.lastName = "Invalid last name";
    }

    if (!newUser.email) {
        errors.email = "Missing email";
    } else if (!newUser.email.match("^\\S+@\\S+\\.\\S+$")) {
        errors.email = "Invalid email";
    }

    if (!newUser.password) {
        errors.password = "Missing password";
    } else if (!newUser.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d_\\.*-]{8,}$")) {
        errors.password = "Invalid password";
    }

    try {
        const user = await UserDb.findOne({ email: newUser.email });
        if (user) {
            errors.email = "There is already an account with this email";
        }
        return errors;
    } catch {
        res.status(500).send("Failed to register");
        return;
    }
};

module.exports = controller;
