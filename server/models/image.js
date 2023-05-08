const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const image = sequelize.define(
    "image",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      url: {
        tpye: Sequelize.STRING(300),
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "image",
      timestamp: false,
    }
  );
  return image;
};
