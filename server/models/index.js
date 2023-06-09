"use strict";

const Sequelize = require("sequelize");
const process = require("process");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.cobuying_room = require("./cobuying_room")(sequelize, Sequelize);
db.sell = require("./sell")(sequelize, Sequelize);
db.notification = require("./notification")(sequelize, Sequelize);
db.update_post = require("./update_post")(sequelize, Sequelize);
db.deposit_form = require("./deposit_form")(sequelize, Sequelize);
db.answer = require("./answer")(sequelize, Sequelize);
db.chatroom = require("./chatroom")(sequelize, Sequelize);
db.chat_message = require("./chat_message")(sequelize, Sequelize);
db.product = require("./product")(sequelize, Sequelize);
db.image = require("./image")(sequelize, Sequelize);
db.demand_user = require("./demand_user")(sequelize, Sequelize);
/* user & cobuying_room */
// 1:N 한명의 회원은 여러개의 공동구매의 주최자가 될 수 있다.
db.user.hasMany(db.cobuying_room, { foreignKey: "host_id", sourceKey: "id" });
db.cobuying_room.belongsTo(db.user, { foreignKey: "host_id", sourceKey: "id" });

// N:M 2가지, demand_user
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
// 1:N 한개의 공동구매방에서는 여러개의 상품을 판매할 수 있다
db.cobuying_room.hasMany(db.sell, {
  foreignKey: "cobuying_room_id",
  sourceKey: "id",
});
db.sell.belongsTo(db.cobuying_room, {
  foreignKey: "cobuying_room_id",
  sourceKey: "id",
});

/* sell & product */
// 1:N 하나의 상품에 대해 여러개의 판매를 진행할 수 있다(옵션고려)
db.product.hasMany(db.sell, {
  foreignKey: "product_id",
  sourceKey: "id",
});
db.sell.belongsTo(db.product, {
  foreignKey: "product_id",
  sourceKey: "id",
});
/* product & image */
// 1:N 하나의 상품에 대해 여러개의 이미지를 업로드 할 수 있다
db.product.hasMany(db.image, {
  foreignKey: "product_id",
  sourceKey: "id",
});
db.image.belongsTo(db.product, {
  foreignKey: "product_id",
  sourceKey: "id",
});
/* form_user & notification */
// N:M 공동구매에 참여한 회원(form_user)는 여러개의 알림을 수신할 수 있다.
// 실행시키면 알아서 trough 테이블이 만들어짐 -> 실제로 생기면 체크해보기
db.user.belongsToMany(db.notification, {
  through: "receive",
});
db.notification.belongsToMany(db.user, { through: "receive" });
/* cobuying_room & notification */
// 1:N 하나의 공동구매방에 대해 여러개의 알람을 보낼 수 있다
db.cobuying_room.hasMany(db.notification, {
  foreignKey: "cobuying_room_id",
  sourceKey: "id",
});
db.notification.belongsTo(db.cobuying_room, {
  foreignKey: "cobuying_room_id",
  sourceKey: "id",
});
/* cobuying_room & update_post */
// 1:N 하나의 공동구매방에 대해 여러개의 소식을 업로드 할 수 있다
db.cobuying_room.hasMany(db.update_post, {
  foreignKey: "cobuying_room_id",
  sourceKey: "id",
});
db.update_post.belongsTo(db.cobuying_room, {
  foreignKey: "cobuying_room_id",
  sourceKey: "id",
});
/* cobuying_room & deposit_form */
// 1:1 하나의 공동구매방에 대해 하나의 입금폼이 존재한다
db.cobuying_room.hasOne(db.deposit_form, {
  foreignKey: "id",
  sourceKey: "id",
});
db.deposit_form.belongsTo(db.cobuying_room, {
  foreignKey: "id",
  sourceKey: "id",
});

/* deposit_form & answer */
// 1:N 하나의 입금폼 대해 여러개의 답변이 존재한다
db.deposit_form.hasMany(db.answer, {
  sourceKey: "id",
  foreignKey: "id",
});
db.answer.belongsTo(db.deposit_form, {
  sourceKey: "id",
  foreignKey: "id",
});

/* cobuying_room & chatroom */
// 1:N 하나의 공동구매에 대해 여러개의 채팅방이 생성된다
db.cobuying_room.hasMany(db.chatroom, {
  foreignKey: "cobuying_room_id",
  sourceKey: "id",
});
db.chatroom.belongsTo(db.cobuying_room, {
  foreignKey: "cobuying_room_id",
  sourceKey: "id",
});
/* chatroom & chat_message */
// 1:N 하나의 채팅방에 여러개의 메시지가 존재
db.chatroom.hasMany(db.chat_message, {
  foreignKey: "cobuying_room_id",
  sourceKey: "cobuying_room_id",
});
db.chatroom.hasMany(db.chat_message, {
  foreignKey: "chatroom_id",
  sourceKey: "id",
});
db.chat_message.belongsTo(db.chatroom, {
  foreignKey: "cobuying_room_id",
  sourceKey: "cobuying_room_id",
});
db.chat_message.belongsTo(db.chatroom, {
  foreignKey: "chatroom_id",
  sourceKey: "id",
});

module.exports = db;
