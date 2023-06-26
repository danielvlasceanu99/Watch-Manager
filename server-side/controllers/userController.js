const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const secret = process.env.SECRET;

const ObjectId = require("mongodb").ObjectId;
const UserDb = require("../models").Users;

const sequelize = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

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
            followedUsers: [],
        };

        let errors = {};
        try {
            errors = await validateUser(req.body);
        } catch {
            res.status(500).send({ message: "Failed to register" });
        }

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
                    res.status(500).send({ message: "Failed to register" });
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

    getDashboardData: async (req, res) => {
        let response = {};
        await sequelize
            .query(
                "SELECT COUNT(movie_id) as count, genres.id, genres.name FROM (SELECT movies.id AS movie_id, genre_to_movie.genre_id FROM `movies` AS movies JOIN `genre_to_movie` AS genre_to_movie ON movies.id = genre_to_movie.movie_id) AS genre_movies JOIN `genres` AS genres ON genre_movies.genre_id = genres.id WHERE 1 GROUP BY genres.name order by count desc limit 10",
                {
                    type: Sequelize.QueryTypes.SELECT,
                }
            )
            .then((results) => {
                response.movies_genre = results;
            })
            .catch((error) => {
                res.status(500).send({ message: "Server error" });
            });

        await sequelize
            .query(
                "SELECT count(tv_id) count, genres.id, genres.name FROM (SELECT tvs.id as tv_id, genre_to_tv.genre_id FROM `tvs` as tvs join `genre_to_tv` as genre_to_tv on tvs.id = genre_to_tv.tv_id) as genre_tv join `genres` genres on genre_tv.genre_id = genres.id where 1 GROUP BY genres.name order by count desc limit 10; ",
                {
                    type: Sequelize.QueryTypes.SELECT,
                }
            )
            .then((results) => {
                response.tv_genre = results;
            })
            .catch((error) => {
                res.status(500).send({ message: "Server error" });
            });

        await sequelize
            .query("SELECT count(id) count, status from `movies` group by status;", {
                type: Sequelize.QueryTypes.SELECT,
            })
            .then((results) => {
                response.movie_status = results;
            })
            .catch((error) => {
                res.status(500).send({ message: "Server error" });
            });

        await sequelize
            .query(
                "select sum(seasons_episodes.ep_count) as episode_count, tvs.id, tvs.name from ( select count(episodes.id) as ep_count, seasons.id, seasons.tv_id from `seasons` as seasons join `episodes` as episodes on seasons.id = episodes.season_id group by seasons.id ) as seasons_episodes join `tvs` as tvs on seasons_episodes.tv_id = tvs.id group by tvs.id order by episode_count desc limit 10;",
                {
                    type: Sequelize.QueryTypes.SELECT,
                }
            )
            .then((results) => {
                response.ep_number = results;
            })
            .catch((error) => {
                res.status(500).send({ message: "Server error" });
            });

        res.status(200).send(response);
    },

    follow: async (req, res) => {
        const userId = req.body.userId;
        if (!userId) {
            res.status(400).send({ message: "Invalid request" });
        }
        try {
            const user = await UserDb.findOne({ _id: ObjectId(userId) });
            if (!user) {
                res.status(404).send({ message: "There is no such account" });
            }

            if (!req.user["followedUsers"].includes(user._id)) {
                req.user["followedUsers"].push(user._id);
                await UserDb.updateOne(
                    { _id: ObjectId(req.user._id) },
                    { $set: { ["followedUsers"]: req.user["followedUsers"] } }
                );
            }
            res.status(200).send({ message: `Following ${user.name}` });
        } catch (err) {
            res.status(401).send({ message: "Server error" });
        }
    },

    unfollow: async (req, res) => {
        const userId = req.body.userId;
        if (!userId) {
            res.status(400).send({ message: "Invalid request" });
        }
        try {
            const index = req.user["followedUsers"].findIndex((objId) => objId.toString() === userId);
            if (index > -1) {
                req.user["followedUsers"].splice(index, 1);
                await UserDb.updateOne(
                    { _id: ObjectId(req.user._id) },
                    { $set: { ["followedUsers"]: req.user["followedUsers"] } }
                );
            }
            res.status(200).send({ message: `Unfollowed` });
        } catch (err) {
            res.status(401).send({ message: "Server error" });
        }
    },

    getAllFollowed: async (req, res) => {
        const filter = { _id: { $in: req.user.followedUsers } };
        const projection = { _id: 1, name: 1 };

        try {
            const followedUsers = await UserDb.find(filter, { projection }).toArray();
            res.status(200).send(followedUsers);
        } catch (err) {
            res.status(401).send({ message: "Server error" });
        }
    },

    getUserLiked: async (req, res) => {
        const userId = req.params.userId;
        if (!userId) {
            res.status(400).send({ message: "Invalid request" });
        }
        try {
            const filter = { _id: ObjectId(userId) };
            const projection = { _id: 1, name: 1, likedMovies: 1, likedTv: 1 };
            const user = await UserDb.findOne(filter, { projection });
            if (!user) {
                res.status(404).send({ message: "There is no such account" });
            }
            res.status(200).send(user);
        } catch (err) {
            res.status(401).send({ message: "Server error" });
        }
    },
};

// SELECT count(tv_id), genres.name FROM (
//     SELECT tvs.id as tv_id, genre_to_tv.genre_id
//     FROM `tvs` as tvs join `genre_to_tv` as genre_to_tv
//     on tvs.id = genre_to_tv.tv_id
// ) as genre_tv join `genres` genres
// on genre_tv.genre_id = genres.id where 1
// GROUP BY genres.name;

// select sum(seasons_episodes.ep_count) as episode_count, tvs.name from (
//     select count(episodes.id) as ep_count, seasons.id, seasons.tv_id
//     from `seasons` as seasons join `episodes` as episodes
//     on seasons.id = episodes.season_id
//     group by seasons.id
// ) as seasons_episodes join `tvs` as tvs
// on seasons_episodes.tv_id = tvs.id
// group by tvs.id

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

    const user = await UserDb.findOne({ email: newUser.email });
    if (user) {
        errors.email = "There is already an account with this email";
    }
    return errors;
};

module.exports = controller;
