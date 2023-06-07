module.exports = (sequelize, Sequelize) => {
  const answer = sequelize.define(
    "answer",
    {
      user_id: {
        type: Sequelize.STRING(20), // VARCHAR(20)
        allowNull: false,
        unique: true,
        comment: "로그인 아이디",
        primaryKey: true,
      },
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "폼 아이디(공동구매방 아이디)",
      },
      answers: {
        type: Sequelize.JSON,
        validate: {
          isValidFormat(value) {
            if (typeof value !== "object") {
              throw new Error("❌ INVALID answer format on save");
            }
          },
        },
      },
    },
    {
      tableName: "answer",
      timestamps: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return answer;
};
