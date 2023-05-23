module.exports = (sequelize, Sequelize) => {
  const deposit_form = sequelize.define(
    "deposit_form",
    {
      // id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   primaryKey: true,
      // },
      cobuying_room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      descriription: {
        type: Sequelize.STRING(500),
        // allowNull: false,
      },
      questions: {
        type: Sequelize.STRING,
        get: function () {
          return JSON.parse(this.getDataValue("questions"));
        },
        set: function (value) {
          return this.setDataValue("questions", value);
        },
      },
      end_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "deposit_form",
      timestamp: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return deposit_form;
};
