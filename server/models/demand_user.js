// const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const demand_user = sequelize.define(
    "demand_user",
    {
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      cobuying_room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: "demand_user",
      timestamp: false,
    }
  );
  return demand_user;
};
