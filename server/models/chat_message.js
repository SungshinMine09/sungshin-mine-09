module.exports = (sequelize, Sequelize) => {
  const chat_message = sequelize.define(
    "chat_message",
    {
      id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        autoIncreament: true,
        primaryKey: true,
      },
      chatroom_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      cobuying_room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      chat_message: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      // created_at: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      // },
    },
    {
      tableName: "chat_message",
      timestamps: true, //createAt활성화
    }
  );
  return chat_message;
};
