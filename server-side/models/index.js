const Sequelize = require("sequelize");
const mySqlDb = require("../config/dbConfig");
const mongoDb = require("../config/mongoDbConfig");

const MovieModel = require("./movie");
const TvModel = require("./tv");
const SeasonModel = require("./season");
const EpisodeModel = require("./episode");
const GenreModel = require("./genre");
const PersonModel = require("./person");
const CreditModel = require("./credit");
const ReviewModel = require("./review");
const RatingModel = require("./rating");

const Movie = MovieModel(mySqlDb, Sequelize);
const TV = TvModel(mySqlDb, Sequelize);
const Season = SeasonModel(mySqlDb, Sequelize);
const Episode = EpisodeModel(mySqlDb, Sequelize);
const Genre = GenreModel(mySqlDb, Sequelize);
const Person = PersonModel(mySqlDb, Sequelize);
const Credit = CreditModel(mySqlDb, Sequelize);
const Review = ReviewModel(mySqlDb, Sequelize);
const Rating = RatingModel(mySqlDb, Sequelize);

const db = mongoDb.db("watch-manager");
const Users = db.collection("users");

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
    Users,
    connection: mySqlDb,
};
