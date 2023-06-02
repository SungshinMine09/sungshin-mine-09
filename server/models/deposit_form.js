module.exports = (sequelize, Sequelize) => {
  const deposit_form = sequelize.define(
    "deposit_form",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: "위 계좌에 입금해주세요🙏",
      },
      next_questions_num: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },

      description: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      questions: {
        type: Sequelize.JSON,
      },
      account: {
        type: Sequelize.STRING,
        comment: "판매자 계좌",
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        get: function () {
          return moment(this.getDataValue("created_at")).format(
            "DD/MM/YYYY h:mm:ss"
          );
        },

      },
      end_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        get: function () {
          return moment(this.getDataValue("end_at")).format(
            "DD/MM/YYYY h:mm:ss"
          );
        },
      },
    },
    {
      tableName: "deposit_form",
      timestamp: false,
      // If don't want createdAt
      createdAt: false,

      // If don't want updatedAt
      updatedAt: false,
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
      // charset: "utf8",
      // collate: "utf8_unicode_ci", -> that not working
    }
  );
  return deposit_form;
};
