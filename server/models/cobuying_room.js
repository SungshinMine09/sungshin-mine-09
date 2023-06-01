module.exports = (sequelize, Sequelize) => {
  const cobuying_room = sequelize.define(
    "cobuying_room",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      title: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      state: {
        type: Sequelize.ENUM(
          "demand",
          "deposit",
          "ready",
          "delivery",
          "complete"
        ),
        defaultValue: "demand",
        comment: "수요조사, 입금중, 준비중, 배송중, 공동구매 완료만 허용",
      },
      description: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      host_id: {
        type: Sequelize.BIGINT,
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
