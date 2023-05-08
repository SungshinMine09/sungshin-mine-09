"use strict";

const Sequelize = require("sequelize");
const process = require("process");
const cobuying_room = require("./cobuying_room");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.cobuying_room = require("./cobuying_room")(sequelize, Sequelize);

module.exports = db;
