// const { Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const question = sequelize.define(
    "question",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      deposit_form_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      cobuying_room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      question: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "question",
      timestamp: false,
    }
  );
  return question;
};
