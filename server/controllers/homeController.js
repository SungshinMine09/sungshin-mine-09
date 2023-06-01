const db = require("../models/index"),
  CoBuyRoom = db.cobuying_room;

module.exports = {
  index: async (req, res) => {
    try {
      newGonggus = await db.sequelize.query('SELECT A.*, B.id, B.url, replace(B.url, "public\", "") AS real_url, b.createdAt, b.updatedAt FROM (SELECT A.*, B.name FROM (SELECT A.product_id, A.cobuying_room_id, B.title, A.current_demand, B.createdAt AS cobuying_room_createdAt FROM sell AS A LEFT JOIN cobuying_room AS B ON A.cobuying_room_id=B.id) AS A LEFT JOIN product AS B ON A.product_id=B.id) AS A LEFT JOIN image AS B ON A.product_id=B.product_id ORDER BY cobuying_room_createdAt DESC LIMIT 2;');
      hotGonggus = await db.sequelize.query('SELECT A.*, B.id, B.url, replace(B.url, "public\", "") AS real_url, b.createdAt, b.updatedAt FROM (SELECT A.*, B.name FROM (SELECT A.product_id, A.cobuying_room_id, B.title, A.current_demand FROM sell AS A LEFT JOIN cobuying_room AS B ON A.cobuying_room_id=B.id) AS A LEFT JOIN product AS B ON A.product_id=B.id) AS A LEFT JOIN image AS B ON A.product_id=B.product_id ORDER BY A.current_demand DESC LIMIT 2;');
      
      res.render("home/index", {newGonggus: newGonggus[0], hotGonggus: hotGonggus[0]});
    } catch(error) {
      console.log(error);
    }
  },
};
