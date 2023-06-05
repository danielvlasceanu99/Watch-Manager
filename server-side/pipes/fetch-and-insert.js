const fetchMovies = require("./fetch-movies");
const fetchTvShows = require("./fetch-tvShows");
const fetchGenres = require("./fetch-genres");
const fetchPeople = require("./fetch-people");

const fetchData = async () => {
    await fetchGenres();
    await fetchMovies();
    await fetchTvShows();
    await fetchPeople();
};

fetchData();
