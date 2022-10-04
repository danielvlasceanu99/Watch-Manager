const Sequelize = require("sequelize");
const db = require("../config/dbConfig");

const MovieModel = require("./movie");
const TvModel = require("./tv");
const SeasonModel = require("./season");
const EpisodeModel = require("./episode");
const GenreModel = require("./genre");
const PersonModel = require("./person");
const MovieCreditModel = require("./movie-credit");
const TvCreditModel = require("./tv-credit");
const MovierReviewModel = require("./movie-review");
const TvReviewModel = require("./tv-review.js");
const MovieRatingModel = require("./movie-rating");
const TvRatingModel = require("./tv-rating");

const Movie = MovieModel(db, Sequelize);
const TV = TvModel(db, Sequelize);
const Season = SeasonModel(db, Sequelize);
const Episode = EpisodeModel(db, Sequelize);
const Genre = GenreModel(db, Sequelize);
const Person = PersonModel(db, Sequelize);
const MovieCredit = MovieCreditModel(db, Sequelize);
const TvCredit = TvCreditModel(db, Sequelize);
const MovieReview = MovierReviewModel(db, Sequelize);
const TvReview = TvReviewModel(db, Sequelize);
const MovieRating = MovieRatingModel(db, Sequelize);
const TvRating = TvRatingModel(db, Sequelize);

Movie.hasMany(MovieReview, {
    onDelete: "Cascade",
});
MovieReview.belongsTo(Movie, {
    foreignKey: "movie_id",
});

Movie.hasMany(MovieRating, {
    onDelete: "Cascade",
});
MovieRating.belongsTo(Movie, {
    foreignKey: "movie_id",
});

Movie.hasMany(MovieCredit, {
    onDelete: "Cascade",
});
MovieCredit.belongsTo(Movie, {
    foreignKey: "movie_id",
});

Movie.belongsToMany(Genre, { through: "genre_to_movie" });
Genre.belongsToMany(Movie, { through: "genre_to_movie" });

TV.hasMany(TvReview, {
    onDelete: "Cascade",
});
TvReview.belongsTo(TV, {
    foreignKey: "tv_id",
});

TV.hasMany(TvRating, {
    onDelete: "Cascade",
});
TvRating.belongsTo(TV, {
    foreignKey: "tv_id",
});

TV.hasMany(TvCredit, {
    onDelete: "Cascade",
});
TvCredit.belongsTo(TV, {
    foreignKey: "tv_id",
});

TV.hasMany(Season, {
    onDelete: "Cascade",
});
Season.belongsTo(TV, {
    foreignKey: "tv_id",
});

Season.hasMany(Episode, {
    onDelete: "Cascade",
});
Episode.belongsTo(Season, {
    foreignKey: "season_id",
});

TV.belongsToMany(Genre, { through: "genre_to_tv" });
Genre.belongsToMany(TV, { through: "genre_to_tv" });

Person.hasMany(TvCredit, {
    onDelete: "Cascade",
});
TvCredit.belongsTo(Person, {
    foreignKey: "person_id",
});

Person.hasMany(MovieCredit, {
    onDelete: "Cascade",
});
MovieCredit.belongsTo(Person, {
    foreignKey: "person_id",
});

module.exports = {
    Movie,
    TV,
    Season,
    Episode,
    Genre,
    Person,
    MovieCredit,
    TvCredit,
    MovieReview,
    TvReview,
    MovieRating,
    TvRating,
    connection: db,
};
