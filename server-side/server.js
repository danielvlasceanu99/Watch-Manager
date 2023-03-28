const express = require("express");
const router = require("./routes");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const mongoClient = require("./config/mongoDbConfig");
mongoClient.connect((err) => {
    if (err) {
        console.error("Failed to connect to MongoDB", err);
        return;
    }
    console.log("Connected to MongoDB");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server is running on port " + port);
});
