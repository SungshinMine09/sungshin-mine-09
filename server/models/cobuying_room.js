module.exports = (sequelize, Sequelize) => {
  // foreign Key: (user):id
  const cobuying_room = sequelize.define(
    "cobuying_room",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      host_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      title: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(10),
        allowNull: false,
        type: DataTypes.ENUM["demand, deposit, ready, delivery, complete"],
        defaultValue: "demand",
        comment: "수요조사, 입금중, 준비중, 배송중, 공동구매 완료만 허용",
      },
      descripton: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
    },
    {
      tableName: "cobuying_room",
      timestamp: false,
    }
  );
  return cobuying_room;
};
