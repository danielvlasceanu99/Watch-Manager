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

        const filter = { email: email };
        const projection = { _id: 1, name: 1, email: 1, password: 1 };

        try {
            const user = await UserDb.findOne(filter, { projection });
            if (!user) {
                res.status(404).send({ message: "No account with this email" });
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(500).send({ message: "Server error" });
                }
                if (result) {
                    const token = jwt.sign({ user }, secret);
                    res.status(200).send({ token: token });
                } else {
                    res.status(400).send({ message: "Incorect password" });
                }
            });
        } catch {
            res.status(500).send({ message: "Failed to login" });
        }
    },

    getUserData: async (req, res) => {
        const token = req.headers["authorization"];
        if (!token) {
            res.status(401).send({ message: "No token provided" });
        }
        try {
            const user = await UserDb.findOne({ _id: ObjectId(jwt.verify(token, secret).user._id) });
            if (!user) {
                res.status(404).send({ message: "There is no such account" });
            }
            res.status(200).send({ user });
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
            watchedTvs: [],
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

    addToCollection: async (req, res) => {
        const token = req.headers["authorization"];
        if (!token) {
            res.status(401).send({ message: "No token provided" });
        }
        const { mediaId, collection } = req.body;
        if (!mediaId || !collection) {
            res.status(400).send({ message: "Invalid request" });
        }
        try {
            const user = await UserDb.findOne({ _id: ObjectId(jwt.verify(token, secret).user._id) });
            if (!user) {
                res.status(404).send({ message: "There is no such account" });
            }

            if (user[collection] && !user[collection].includes(mediaId)) {
                user[collection].push(mediaId);
                await UserDb.updateOne({ _id: ObjectId(user._id) }, { $set: { [collection]: user[collection] } });
            }
            res.status(200).send({ message: `Collection updated` });
        } catch (err) {
            res.status(401).send({ message: "Invalid token" });
        }
    },

    removeFromCollection: async (req, res) => {
        const token = req.headers["authorization"];
        if (!token) {
            res.status(401).send({ message: "No token provided" });
        }
        const { mediaId, collection } = req.body;
        if (!mediaId || !collection) {
            res.status(400).send({ message: "Invalid request" });
        }
        try {
            const user = await UserDb.findOne({ _id: ObjectId(jwt.verify(token, secret).user._id) });
            const index = user[collection].indexOf(mediaId);

            if (index > -1) {
                user[collection].splice(index, 1);
                await UserDb.updateOne({ _id: ObjectId(user._id) }, { $set: { [collection]: user[collection] } });
            }
            res.status(200).send({ message: `Collection updated` });
        } catch (err) {
            res.status(401).send({ message: "Invalid token" });
        }
    },

    addRating: async (req, res) => {
        const token = req.headers["authorization"];
        if (!token) {
            res.status(401).send({ message: "No token provided" });
        }
        const { mediaId, rating, collection } = req.body;
        if (!mediaId || !rating || !collection) {
            res.status(400).send({ message: "Invalid request" });
        } else if (rating > 10 || rating < 1) {
            res.status(400).send({ message: "Invalid rating" });
        }
        try {
            const user = await UserDb.findOne({ _id: ObjectId(jwt.verify(token, secret).user._id) });
            if (!user) {
                res.status(404).send({ message: "There is no such account" });
            }
            if (user[collection]) {
                const index = user[collection].findIndex((media) => media.id === mediaId);
                console.log(index);
                if (index === -1) {
                    user[collection].push({ id: mediaId, rating: rating });
                } else {
                    user[collection][index].rating = rating;
                }
            }
            await UserDb.updateOne({ _id: ObjectId(user._id) }, { $set: { [collection]: user[collection] } });
            res.status(200).send({ message: `Collection updated` });
        } catch (err) {
            res.status(401).send({ message: "Invalid token" });
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
