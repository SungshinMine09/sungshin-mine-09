module.exports = (sequelize, Sequelize) => {
  const image = sequelize.define(
    "image",
    {
      id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      url: {
        type: Sequelize.STRING(300),
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

  image.getUrlByProductId = async (product_id) => {
    try {
      const image = await this.findOne({
        where: {
          product_id: product_id
        },
      });
      if (!image) {
        throw new Error(`${product_id} Image NOT EXISTS `);
      }
    } catch(error) {
      console.log(error);
    }
    return image.url;
  };

  return image;
};
