module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNULL: true,
        comment: "DB에서 사용할 아이디",
      },
      login_id: {
        type: Sequelize.STRING(20), // VARCHAR(20)
        allowNull: false,
        unique: true,
        comment: "로그인 아이디",
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      student_number: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },
      phone_number: {
        type: Sequelize.STRING(15),
        unique: true,
      },
    },
    {
      tableName: "user",
      timestamps: false,
    }
  );
  return user;
};
