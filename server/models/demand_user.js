const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const demand_user = sequelize.define("demand_user", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    cobuying_room: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    phone_number: {
      type: Sequelize.STRING(15),
      allowNull: true,
      primaryKey: true,
    },
  });
};
