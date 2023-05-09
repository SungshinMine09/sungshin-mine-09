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
      user_id: {
        type: Sequelize.STRING(20), // VARCHAR(20)
        allowNull: false,
        unique: true,
        comment: "로그인 아이디",
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
