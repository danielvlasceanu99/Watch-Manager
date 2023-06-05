const axios = require("axios");
const dotenv = require("dotenv");
const PersonDb = require("../models").Person;
const CreditDb = require("../models").Credit;

const sequelize = require("../config/dbConfig");
const { Sequelize } = require("sequelize");

dotenv.config({ path: "./config.env" });
const key = process.env.API_KEI;

const fetchPeople = async () => {
    movie_cast = [
        {
            id: 109,
            character: "Frodo",
            credit_id: "52fe421ac3a36847f800448f",
        },
        {
            id: 1327,
            character: "Gandalf",
            credit_id: "52fe421ac3a36847f8004493",
        },
        {
            id: 882,
            character: "Arwen",
            credit_id: "52fe421ac3a36847f800449b",
        },
        {
            id: 110,
            character: "Aragorn",
            credit_id: "52fe421ac3a36847f8004497",
        },
        {
            id: 1328,
            character: "Sam",
            credit_id: "52fe421ac3a36847f80044af",
        },
        {
            id: 112,
            character: "Galadriel",
            credit_id: "52fe421ac3a36847f80044bf",
        },
        {
            id: 655,
            character: "Gimli",
            credit_id: "52fe421ac3a36847f80044a3",
        },
        {
            id: 1329,
            character: "Pippin",
            credit_id: "52fe421ac3a36847f80044b3",
        },
        {
            id: 1330,
            character: "Merry",
            credit_id: "52fe421ac3a36847f80044b7",
        },
        {
            id: 114,
            character: "Legolas",
            credit_id: "52fe421ac3a36847f800449f",
        },
        {
            id: 113,
            character: "Saruman",
            credit_id: "52fe421ac3a36847f80044ab",
        },
        {
            id: 1331,
            character: "Elrond",
            credit_id: "52fe421ac3a36847f80044bb",
        },
        {
            id: 48,
            character: "Boromir",
            credit_id: "52fe421ac3a36847f80044a7",
        },
        {
            id: 65,
            character: "Bilbo",
            credit_id: "52fe421ac3a36847f80044c3",
        },
        {
            id: 1333,
            character: "Gollum",
            credit_id: "52fe421ac3a36847f80044d3",
        },
    ];
    movie_crew = [
        {
            id: 123,
            credit_id: "52fe421ac3a36847f80043fb",
            job: "Producer",
        },
        {
            id: 108,
            credit_id: "52fe421ac3a36847f80043f5",
            job: "Producer",
        },
        {
            id: 126,
            credit_id: "5be39f84c3a36810d2021ff1",
            job: "Producer",
        },
    ];

    tv_cast = [
        {
            id: 52139,
            character: "Brian Griffin & Stewie Griffin",
            credit_id: "5256e93519c2956ff61077b4",
        },
        {
            id: 24357,
            name: "Alex Borstein",
            character: "Lois Griffin & Tricia Takanawa",
            credit_id: "5256e93419c2956ff61075f8",
        },
        {
            id: 13922,
            name: "Seth Green",
            character: "Chris Griffin",
            order: 3,
        },
    ];
    tv_crew = [
        {
            id: 99354,
            credit_id: "5c26aac392514138d7bd9493",
            job: "Producer",
        },
    ];

    movie_cast.forEach(async (person) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/person/${person.id}?api_key=${key}&language=en-US`
        );
        const cast = {
            id: response.data.id,
            name: response.data.name,
            gender: response.data.gender == 1 ? "Female" : response.data.gender == 2 ? "Male" : "Other",
            biography: response.data.biography,
            place_of_birth: response.data.place_of_birth,
            birthday: response.data.birthday,
            death_date: response.data.death_date,
            known_for_department: response.data.known_for_department,
            created_at: new Date(),
            created_by: "auto-inserter",
            last_changed_at: new Date(),
            last_changed_by: "auto-inserter",
            poster_path: `https://image.tmdb.org/t/p/w500${response.data.profile_path}`,
        };
        await PersonDb.create(cast)
            .then(async (cast) => {
                console.log("Iserted person ", cast.id);
                const credit = {
                    id: person.credit_id,
                    movie_id: 120,
                    person_id: cast.id,
                    job: person.character,
                    credit_type: "Cast",
                    media_type: "movie",
                    created_at: new Date(),
                    created_by: "auto-inserter",
                    last_changed_at: new Date(),
                    last_changed_by: "auto-inserter",
                };
                await CreditDb.create(credit)
                    .then(async (credit) => {
                        console.log("Iserted credit ", credit.id);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    });

    tv_cast.forEach(async (person) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/person/${person.id}?api_key=${key}&language=en-US`
        );
        const cast = {
            id: response.data.id,
            name: response.data.name,
            gender: response.data.gender == 1 ? "Female" : response.data.gender == 2 ? "Male" : "Other",
            biography: response.data.biography,
            place_of_birth: response.data.place_of_birth,
            birthday: response.data.birthday,
            death_date: response.data.death_date,
            known_for_department: response.data.known_for_department,
            created_at: new Date(),
            created_by: "auto-inserter",
            last_changed_at: new Date(),
            last_changed_by: "auto-inserter",
            poster_path: `https://image.tmdb.org/t/p/w500${response.data.profile_path}`,
        };
        await PersonDb.create(cast)
            .then(async (cast) => {
                console.log("Iserted person ", cast.id);
                const credit = {
                    id: person.credit_id,
                    tv_id: 1434,
                    person_id: cast.id,
                    job: person.character,
                    credit_type: "Cast",
                    media_type: "tv",
                    created_at: new Date(),
                    created_by: "auto-inserter",
                    last_changed_at: new Date(),
                    last_changed_by: "auto-inserter",
                };
                await CreditDb.create(credit)
                    .then(async (credit) => {
                        console.log("Iserted credit ", credit.id);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    });

    movie_crew.forEach(async (person) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/person/${person.id}?api_key=${key}&language=en-US`
        );
        const cast = {
            id: response.data.id,
            name: response.data.name,
            gender: response.data.gender == 1 ? "Female" : response.data.gender == 2 ? "Male" : "Other",
            biography: response.data.biography,
            place_of_birth: response.data.place_of_birth,
            birthday: response.data.birthday,
            death_date: response.data.death_date,
            known_for_department: response.data.known_for_department,
            created_at: new Date(),
            created_by: "auto-inserter",
            last_changed_at: new Date(),
            last_changed_by: "auto-inserter",
            poster_path: `https://image.tmdb.org/t/p/w500${response.data.profile_path}`,
        };
        await PersonDb.create(cast)
            .then(async (cast) => {
                console.log("Iserted person ", cast.id);
                const credit = {
                    id: person.credit_id,
                    movie_id: 120,
                    person_id: cast.id,
                    job: person.job,
                    credit_type: "Crew",
                    media_type: "movie",
                    created_at: new Date(),
                    created_by: "auto-inserter",
                    last_changed_at: new Date(),
                    last_changed_by: "auto-inserter",
                };
                await CreditDb.create(credit)
                    .then(async (credit) => {
                        console.log("Iserted credit ", credit.id);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    });

    tv_crew.forEach(async (person) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/person/${person.id}?api_key=${key}&language=en-US`
        );
        const cast = {
            id: response.data.id,
            name: response.data.name,
            gender: response.data.gender == 1 ? "Female" : response.data.gender == 2 ? "Male" : "Other",
            biography: response.data.biography,
            place_of_birth: response.data.place_of_birth,
            birthday: response.data.birthday,
            death_date: response.data.death_date,
            known_for_department: response.data.known_for_department,
            created_at: new Date(),
            created_by: "auto-inserter",
            last_changed_at: new Date(),
            last_changed_by: "auto-inserter",
            poster_path: `https://image.tmdb.org/t/p/w500${response.data.profile_path}`,
        };
        await PersonDb.create(cast)
            .then(async (cast) => {
                console.log("Iserted person ", cast.id);
                const credit = {
                    id: person.credit_id,
                    tv_id: 1434,
                    person_id: cast.id,
                    job: person.job,
                    credit_type: "Crew",
                    media_type: "tv",
                    created_at: new Date(),
                    created_by: "auto-inserter",
                    last_changed_at: new Date(),
                    last_changed_by: "auto-inserter",
                };
                await CreditDb.create(credit)
                    .then(async (credit) => {
                        console.log("Iserted credit ", credit.id);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    });
};

module.exports = fetchPeople;
