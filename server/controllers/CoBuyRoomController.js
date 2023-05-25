const db = require("../models/index"),
  CoBuyRoom = db.cobuying_room, 
  Sell = db.sell,
  Product = db.product,
  Image = db.image;

module.exports = {
    totalGonggu: async (req, res) => {
      try {
        totalGonggus = await db.sequelize.query('SELECT A.*, B.id, B.url, replace(B.url, "../public", "") AS real_url, b.createdAt, b.updatedAt FROM (SELECT A.*, B.name FROM (SELECT A.product_id, A.cobuying_room_id, B.title, A.current_demand FROM sell AS A LEFT JOIN cobuying_room AS B ON A.cobuying_room_id=B.id) AS A LEFT JOIN product AS B ON A.product_id=B.id) AS A LEFT JOIN image AS B ON A.product_id=B.product_id;');
        cntTotal = await CoBuyRoom.count();
        res.render("CoBuyRoom/totalGonggu", {totalGonggus: totalGonggus[0], count: cntTotal});
      } catch(error) {
        console.log(error);
      }
    },
    ingSuyo: async (req, res) => {
      try {
        ingSuyos = await db.sequelize.query('SELECT A.*, B.id, B.url, replace(B.url, "../public", "") AS real_url, b.createdAt, b.updatedAt FROM (SELECT A.*, B.name FROM (SELECT A.product_id, A.cobuying_room_id, B.title, A.current_demand FROM sell AS A LEFT JOIN cobuying_room AS B ON A.cobuying_room_id=B.id WHERE B.state="demand") AS A LEFT JOIN product AS B ON A.product_id=B.id) AS A LEFT JOIN image AS B ON A.product_id=B.product_id;');
        cntingSuyo = await CoBuyRoom.count({
          where: {
            state: 'demand'
          }
        });
        res.render("CoBuyRoom/ingSuyo", {ingSuyos: ingSuyos[0], count: cntingSuyo});
      } catch(error) {
        console.log(error);
      }
    },
    soonEnd: async (req, res) => {
      try {
        soonEnds = await db.sequelize.query('SELECT A.*, B.id, B.url, replace(B.url, "../public", "") AS real_url, b.createdAt, b.updatedAt FROM (SELECT A.*, B.name FROM (SELECT A.product_id, A.cobuying_room_id, B.title, A.current_demand FROM sell AS A LEFT JOIN cobuying_room AS B ON A.cobuying_room_id=B.id WHERE B.state="deposit") AS A LEFT JOIN product AS B ON A.product_id=B.id) AS A LEFT JOIN image AS B ON A.product_id=B.product_id;');
        cntsoonEnd = await CoBuyRoom.count({
          where: {
            state: 'deposit'
          }
        });
        res.render("CoBuyRoom/soonEnd", {soonEnds: soonEnds[0], count: cntsoonEnd});
      } catch(error) {
        console.log(error);
      }
    },
    suyoStat: async (req, res) => {
      try {
        CobuyroomID = req.params.id
        suyoStats = await db.sequelize.query('SELECT A.*, B.*, replace(B.url, "../public", "") AS real_url FROM (SELECT A.*, B.`name` FROM (SELECT A.`product_id`, A.`cobuying_room_id`, B.`title`, A.`current_demand`, A.`min_demand` FROM sell AS A LEFT JOIN cobuying_room AS B ON A.`cobuying_room_id`=B.`id`) AS A LEFT JOIN product AS B ON A.`product_id`=B.`id`) AS A LEFT JOIN image AS B ON A.product_id=B.product_id;');
        suyoStat = suyoStats[0].filter(it => it.cobuying_room_id == CobuyroomID);
        res.render("CoBuyRoom/suyoStat", {suyoStats: suyoStat});
      } catch(error) {
        console.log(error);
      }
    },
    newPost: (req, res) => {
        res.render("CoBuyRoom/newpost");
      },
    detail: async (req, res) => {
        try {
          CobuyroomID = req.params.id;
          details = await db.sequelize.query('SELECT A.*, B.end_at FROM (SELECT A.*, B.id, B.url, B.createdAt, B.updatedAt, replace(B.url, "../public", "") AS real_url FROM (SELECT A.*, B.name FROM (SELECT A.product_id, A.cobuying_room_id, A.price, A.current_demand, B.state, B.description, B.title FROM sell AS A LEFT JOIN cobuying_room AS B ON A.cobuying_room_id=B.id) AS A LEFT JOIN product AS B ON A.product_id=B.id) AS A LEFT JOIN image AS B ON A.product_id=B.product_id) AS A LEFT JOIN deposit_form AS B ON A.cobuying_room_id=B.cobuying_room_id;');
          detail = details[0].filter(it => it.cobuying_room_id == CobuyroomID);
          console.log(detail);
          res.render("CoBuyRoom/detail", {details: detail});
        } catch(error) {
          res.render("CoBuyRoom/errorCobuyroom");
        };
      },
    createNewPost: (req, res) => {
        res.render("CoBuyRoom/createPost");
      },
    createCoBuyRoom: (req, res) => {
        res.render("CoBuyRoom/CreateBuyingPage");
      },
    chatting: (req, res) => {
        res.render("CoBuyRoom/chatting");
      },
    fillDepositForm: (req, res) => {
        res.render("CoBuyForm/DepositFormPage");
      },
    submitDepositForm: (req, res) => {
        res.render("CoBuyForm/DepositFormSubmitPage");
      },
    showAccount: (req, res) => {
        res.render("CoBuyForm/ShowAccountPage");
      },
    depositResult: (req, res) => {
        res.render("CoBuyForm/DepositFormResultPage");
      }, 
  };