const db = require("../models/index"),
  CoBuyRoom = db.cobuying_room;

module.exports = {
  index: async (req, res) => {
    try {
      newGonggus = await CoBuyRoom.findAll({
        order: [ ['createdAt', 'DESC'] ],
        limit: 2
      });
      hotGonggus = await CoBuyRoom.findAll({
        order: [ ['createdAt', 'DESC' ] ],
        limit: 2
      })
      res.render("home/index", {newGonggus: newGonggus});
    } catch(error) {
      res.status(500).send({
        message: err.message
      });
    }
  },
};
