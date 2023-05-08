const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const form_user = sequelize.define("form_user", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    cobuying_room_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.STRING(15),
      allowNull: true,
    },
  });
};
