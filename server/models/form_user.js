// const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const form_user = sequelize.define(
    "form_user",
    {
      user_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
        primaryKey: true,
        comment: "로그인 아이디",
      },
      form_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: "form_user",
      timestamp: false,
    }
  );
  return form_user;
};
