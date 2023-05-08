module.exports = (sequelize, Sequelize) => {
  const product = sequelize.define(
    "product",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    }
  );
  return product;
};
