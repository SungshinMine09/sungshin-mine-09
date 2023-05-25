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
        console.log(soonEnds);
        res.render("CoBuyRoom/soonEnd", {soonEnds: soonEnds[0], count: cntsoonEnd});
      } catch(error) {
        console.log(error);
      }
    },
    suyoStat: async (req, res) => {
      try {
        CobuyroomID = req.params.id
        suyoStats = await db.sequelize.query('SELECT A.*, B.`name` FROM (SELECT A.`product_id`, A.`cobuying_room_id`, B.`title`, A.`current_demand`, A.`min_demand` FROM sell AS A LEFT JOIN cobuying_room AS B ON A.`cobuying_room_id`=B.`id`) AS A LEFT JOIN product AS B ON A.`product_id`=B.`id`;');
        suyoStat = suyoStats[0].filter(it => it.cobuying_room_id == CobuyroomID);
        productImages = await db.sequelize.query('SELECT A.cobuying_room_id, B.* FROM sell AS A LEFT JOIN image AS B ON A.product_id=B.product_id;');
        productImage = productImages[0].filter(it => it.cobuying_room_id == CobuyroomID);
        console.log(productImage);
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
          cobuyroom = await CoBuyRoom.findByPk(CobuyroomID);
          sell = await Sell.findOne({
            where: {
              cobuying_room_id: CobuyroomID
            }
          })
          product = await Product.findOne({
            where: {
              id: sell.product_id
            }
          })
          res.render("CoBuyRoom/detail", {
            cobuyroom: cobuyroom,
            sell: sell,
            product: product
          });
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