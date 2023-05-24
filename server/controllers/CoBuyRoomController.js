const db = require("../models/index"),
  CoBuyRoom = db.cobuying_room, 
  Sell = db.sell,
  Product = db.product,
  Image = db.image;

module.exports = {
    totalGonggu: async (req, res) => {
      try {
        data = await CoBuyRoom.findAll();
        cntTotal = await CoBuyRoom.count();
        console.log(data);
        res.render("CoBuyRoom/totalGonggu", {cobuyrooms: data, count: cntTotal});
      } catch(error) {
        console.log(error);
      }
    },
    ingSuyo: async (req, res) => {
      try {
        data = await CoBuyRoom.findAll({
          where: {
            state: 'demand'
          }
        });
        cntingSuyo = await CoBuyRoom.count({
          where: {
            state: 'demand'
          }
        });
        console.log(data);
        res.render("CoBuyRoom/ingSuyo", {cobuyrooms: data, count: cntingSuyo});
      } catch(error) {
        console.log(error);
      }
    },
    soonEnd: async (req, res) => {
      try {
        data = await CoBuyRoom.findAll({
          where: {
            state: 'deposit'
          }
        });
        cntsoonEnd = await CoBuyRoom.count({
          where: {
            state: 'deposit'
          }
        });
        console.log(data);
        res.render("CoBuyRoom/soonEnd", {cobuyrooms: data, count: cntsoonEnd});
      } catch(error) {
        console.log(error);
      }
    },
    suyoStat: async (req, res) => {
      try {
        CobuyroomID = req.params.id
        suyoStats = await db.sequelize.query('SELECT A.*, B.`name` FROM (SELECT A.`product_id`, A.`cobuying_room_id`, B.`title`, A.`current_demand`, A.`min_demand` FROM sell AS A LEFT JOIN cobuying_room AS B ON A.`cobuying_room_id`=B.`id`) AS A LEFT JOIN product AS B ON A.`product_id`=B.`id`;');
        suyoStat = suyoStats[0].filter(it => it.cobuying_room_id == CobuyroomID);
        console.log(suyoStat);
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