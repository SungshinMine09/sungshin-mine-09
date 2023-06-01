module.exports = (sequelize, Sequelize) => {
  const sell = sequelize.define(
    "sell",
    {
      product_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
        // comment: "최소 주문 수량 / min_demand와 같다",
      },
      max_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
        comment: "최대 주문 수량",
      },
      current_quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          isLessThanMaxQuantity(value) {
            if (value > this.max_quantity) {
              throw new Error(`Current quantity (${value}) cannot be greater than max quantity (${this.max_quantity})`);
            }
          },
        },
        // comment: "현재 주문 수량",
      },
      current_demand: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        // comment: "현재 수요조사 인원",
      },
      min_demand: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      // comment: "수요조사 최소 인원",
    },
    {
      tableName: "sell",
      timestamp: false,
    }
  );
  return sell;
};
