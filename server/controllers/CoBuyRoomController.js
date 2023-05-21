"use strict";

const db = require("../models/index");
const CobuyingRoom = db.cobuying_room;
const Sell = db.sell;
const Product = db.product;
const Image = db.image;

module.exports = {
  totalGonggu: (req, res) => {
    res.render("CoBuyRoom/totalGonggu");
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
  // get
  createCoBuyRoomPage: (req, res) => {
    res.render("CoBuyRoom/CreateBuyingPage");
  },
  // post
  createCoBuyRoom: async (req, res) => {
    // console.log(req.body);
    try {
      const newRoom = await CobuyingRoom.create({
        title: req.body.title,
        description: req.body.description,
        host_id: 1,
      });

      const newProduct = await Product.create({
        name: req.body.title,
      });

      const newSell = await Sell.create({
        id: newProduct.id,
        cobuying_room_id: newRoom.id,
        price: req.body.price,
        min_quantity: req.body.min_demand,
        max_quantity: req.body.max_quantity,
        min_demand: req.body.min_demand,
      });
      // imageUrl
      // console.log(`${req.file.path}`);
      const newImage = await Image.create({
        url: req.file.path,
        product_id: newProduct.id,
      });
    } catch (error) {
      console.log(error);
    }

    res.redirect("/CoBuyRoom/newpost");
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
