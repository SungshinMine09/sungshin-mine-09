const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const answer = sequelize.define(
    "answer",
    {
      answer: {
        type: Sequelize.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      question_id: {
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
    },
    {
      tableName: "answer",
      timestamps: false,
    }
  );
  return answer;
};
