const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const notification = sequelize.define("notification", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true,
    },
    receiver_id: {
      type: Sequelize.INTEGER,
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
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    type2: {
      type: DataTypes.ENUM["sell, deposit_form, update_post, chat"],
      allowNull: false,
      comment: "판매, 입금폼, 새소식, 채팅만 허용",
    },
    url: {
      type: Sequelize.STRING(300),
      allowNull: false,
    },
  });
};
