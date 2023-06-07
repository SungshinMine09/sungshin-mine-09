// const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const update_post = sequelize.define(
    "update_post",
    {
      id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
    },
    {
      tableName: "update_post",
      timestamp: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return update_post;
};
