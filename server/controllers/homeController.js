const db = require("../models/index"),
  CoBuyRoom = db.cobuying_room;

module.exports = {
  index: async (req, res) => {
    try {
      newGonggus = await CoBuyRoom.findAll({
        order: [ ['createdAt', 'DESC'] ],
        limit: 2
      });
      hotGonggus = await db.sequelize.query('select distinct a.*, count(`id`) as count from cobuying_room as a left join demand_user as b on a.`id`=b.`cobuying_room_id` group by a.`id` order by `count` DESC limit 2;');
      console.log(hotGonggus); 
      res.render("home/index", {newGonggus: newGonggus, hotGonggus: hotGonggus[0]});
    } catch(error) {
      console.log(error);
    }
  },
};
