const Sequelize = require("sequelize");
const db = require("../config/dbConfig");

const MovieModel = require("./movie");
const TvModel = require("./tv");
const SeasonModel = require("./season");
const EpisodeModel = require("./episode");
const GenreModel = require("./genre");
const PersonModel = require("./person");
const CreditModel = require("./credit");
const ReviewModel = require("./review");
const RatingModel = require("./rating");

const Movie = MovieModel(db, Sequelize);
const TV = TvModel(db, Sequelize);
const Season = SeasonModel(db, Sequelize);
const Episode = EpisodeModel(db, Sequelize);
const Genre = GenreModel(db, Sequelize);
const Person = PersonModel(db, Sequelize);
const Credit = CreditModel(db, Sequelize);
const Review = ReviewModel(db, Sequelize);
const Rating = RatingModel(db, Sequelize);

Movie.hasMany(Review, {
    onDelete: "Cascade",
});
Review.belongsTo(Movie, {
    foreignKey: "movie_id",
});

Movie.hasMany(Rating, {
    onDelete: "Cascade",
});
Rating.belongsTo(Movie, {
    foreignKey: "movie_id",
});

Movie.hasMany(Credit, {
    onDelete: "Cascade",
});
Credit.belongsTo(Movie, {
    foreignKey: "movie_id",
});

Movie.belongsToMany(Genre, { through: "genre_to_movie" });
Genre.belongsToMany(Movie, { through: "genre_to_movie" });

TV.hasMany(Review, {
    onDelete: "Cascade",
});
Review.belongsTo(TV, {
    foreignKey: "tv_id",
});

TV.hasMany(Rating, {
    onDelete: "Cascade",
});
Rating.belongsTo(TV, {
    foreignKey: "tv_id",
});

TV.hasMany(Credit, {
    onDelete: "Cascade",
});
Credit.belongsTo(TV, {
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

Person.hasMany(Credit, {
    onDelete: "Cascade",
});
Credit.belongsTo(Person, {
    foreignKey: "person_id",
});

module.exports = {
    Movie,
    TV,
    Season,
    Episode,
    Genre,
    Person,
    Credit,
    Review,
    Rating,
    connection: db,
};
