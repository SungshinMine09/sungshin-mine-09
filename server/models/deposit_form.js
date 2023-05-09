const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const deposit_form = sequelize.define(
    "deposit_form",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      cobuying_room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      descriription: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      // created_at: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      // },
      end_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "deposit_form",
      timestamp: true,
    }
  );
  return deposit_form;
};
