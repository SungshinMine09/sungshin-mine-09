require("dotenv").config( { path: '../.env'});
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  },
  // production: {
  //   username: process.env.DB_USER,
  //   password: process.env.DB_PW,
  //   database: process.env.DB_NAME,
  //   host: process.env.DB_HOST,
  //   dialect: "mysql",
  //   logging: false,
  // },
};
