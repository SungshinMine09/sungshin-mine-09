const db = require("../models/index"),
  CoBuyRoom = db.cobuying_room;

module.exports = {
    totalGonggu: async (req, res) => {
      try {
        data = await CoBuyRoom.findAll();
        cntTotal = await CoBuyRoom.count();
        console.log(data);
        res.render("CoBuyRoom/totalGonggu", {cobuyrooms: data, count: cntTotal});
      } catch(error) {
        res.status(500).send({
          message: err.message
        });
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
        res.status(500).send({
          message: err.message
        });
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
        res.status(500).send({
          message: err.message
        });
      }
    },
    suyoStat: (req, res) => {
      res.render("CoBuyRoom/suyoStat");
    },
    newPost: (req, res) => {
        res.render("CoBuyRoom/newpost");
      },
    detail: async (req, res) => {
        let CobuyroomID = req.params.id;
        try {
          let cobuyroom = await CoBuyRoom.findByPk(CobuyroomID);
          res.render("CoBuyRoom/detail", {
            cobuyroom: cobuyroom
          });
        } catch(error) {
          console.log(`Error fetching cobuyroom by ID: ${error.message}`);
          next(error);
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