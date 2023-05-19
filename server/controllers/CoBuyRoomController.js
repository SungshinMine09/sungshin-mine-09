const db = require("../models/index"),
  Product = db.product;

module.exports = {
    totalGonggu: async (req, res) => {
      try {
        data = await Product.findAll();
        console.log(data);
        res.render("CoBuyRoom/totalGonggu", {products: data});
      } catch {
        res.status(500).send({
          message: err.message
        });
      }
    },
    ingSuyo: (req, res) => {
      res.render("CoBuyRoom/ingSuyo");
    },
    soonEnd: (req, res) => {
      res.render("CoBuyRoom/soonEnd");
    },
    suyoStat: (req, res) => {
      res.render("CoBuyRoom/suyoStat");
    },
    newPost: (req, res) => {
        res.render("CoBuyRoom/newpost");
      },
    detail: (req, res) => {
        res.render("CoBuyRoom/detail");
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