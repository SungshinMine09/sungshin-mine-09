"use strict";

const Sequelize = require("sequelize");
const process = require("process");
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
db.sell = require("./sell")(sequelize, Sequelize);
db.notification = require("./notification")(sequelize, Sequelize);
/* user & cobuying_room */
// 1:N 한명의 회원은 여러개의 공동구매의 주최자가 될 수 있다.
db.user.hasMany(db.cobuying_room, { foreignKey: "host_id", sourceKey: "id" });
db.cobuying_room.belongsTo(db.user, { foreignKey: "host_id", sourceKey: "id" });
// N:M 2가지, form_user, demand_user
db.user.belongsToMany(db.cobuying_room, {
  through: "form_user",
  targetKey: "id",
  foreignKey: "user_id",
});
db.cobuying_room.belongsToMany(db.user, {
  through: "form_user",
  targetKey: "id",
  foreignKey: "cobuying_room_id",
});
db.user.belongsToMany(db.cobuying_room, {
  through: "demand_user",
  targetKey: "id",
  foreignKey: "user_id",
});
db.cobuying_room.belongsToMany(db.user, {
  through: "demand_user",
  targetKey: "id",
  foreignKey: "cobuying_room_id",
});
/* cobuying_room & sell */
// 1:N 한개의 공동구매방에서는 여러개의 상품을 판매할 수 있다.
db.cobuying_room.hasMany(db.sell, {
  foreignKey: "cobuying_room_id",
  sourceKey: "id",
});
db.sell.belongsTo(db.cobuying_room, {
  foreignKey: "cobuying_room_id",
  sourceKey: "id",
});
/* form_user & notification */
// N:M 공동구매에 참여한 회원(form_user)는 여러개의 알림을 수신할 수 있다.

module.exports = db;
