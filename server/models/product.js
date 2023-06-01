module.exports = (sequelize, Sequelize) => {
  const product = sequelize.define(
    "product",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
    },
    {
      tableName: "product",
      timestamp: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return product;
};
