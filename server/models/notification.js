// const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const notification = sequelize.define(
    "notification",
    {
      id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      receiver_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      cobuying_room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      read_or_not: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      // created_at: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      // },
      type2: {
        type: Sequelize.ENUM("deposit_form", "update_post", "chat"),
        allowNull: false,
        comment: "입금폼, 새소식, 채팅만 허용",
      },
      url: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "notifications",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return notification;
};
