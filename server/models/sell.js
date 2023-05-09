module.exports = (sequelize, Sequelize) => {
  const sell = sequelize.define(
    "sell",
    {
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        // autoIncrement: true,
        unique: true,
      },
      cobuying_room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      min_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      max_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      current_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: max_quantity,
        },
      },
      current_demand: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      min_demand: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
    },
    {
      tableName: "sell",
      timestamp: false,
    }
  );
  return "sell";
};
