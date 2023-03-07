const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const uri = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABSE_PASSWORD);

const mongoClient = new MongoClient(uri, {
    useNewUrlParser: true,
});

module.exports = mongoClient;
