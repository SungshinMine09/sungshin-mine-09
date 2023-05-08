const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const answer_user_list = sequelize.define(
    "answer_user_list",
    {
      question_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
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
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "answer_user_list",
      timestamp: false,
    }
  );
  return answer_user_list;
};
