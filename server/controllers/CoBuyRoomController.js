"use strict";

const db = require("../models/index");
const CobuyingRoom = db.cobuying_room;
const Sell = db.sell;
const Product = db.product;
const Image = db.image;

module.exports = {
  totalGonggu: async (req, res) => {
    try {
      const totalGonggus = await db.sequelize.query(
        'SELECT A.*, B.id, B.url, replace(B.url, "../public", "") AS real_url, b.createdAt, b.updatedAt FROM (SELECT A.*, B.name FROM (SELECT A.product_id, A.cobuying_room_id, B.title, A.current_demand FROM sell AS A LEFT JOIN cobuying_room AS B ON A.cobuying_room_id=B.id) AS A LEFT JOIN product AS B ON A.product_id=B.id) AS A LEFT JOIN image AS B ON A.product_id=B.product_id;'
      );
      const cntTotal = await CobuyingRoom.count();
      res.render("CoBuyRoom/totalGonggu", { totalGonggus: totalGonggus[0], count: cntTotal });
    } catch (error) {
      console.log(error);
    }
  },
  ingSuyo: async (req, res) => {
    try {
      const ingSuyos = await db.sequelize.query(
        'SELECT A.*, B.id, B.url, replace(B.url, "../public", "") AS real_url, b.createdAt, b.updatedAt FROM (SELECT A.*, B.name FROM (SELECT A.product_id, A.cobuying_room_id, B.title, A.current_demand FROM sell AS A LEFT JOIN cobuying_room AS B ON A.cobuying_room_id=B.id WHERE B.state="demand") AS A LEFT JOIN product AS B ON A.product_id=B.id) AS A LEFT JOIN image AS B ON A.product_id=B.product_id;'
      );
      const cntingSuyo = await CobuyingRoom.count({
        where: {
          state: "demand",
        },
      });
      res.render("CoBuyRoom/ingSuyo", { ingSuyos: ingSuyos[0], count: cntingSuyo });
    } catch (error) {
      console.log(error);
    }
  },
  soonEnd: async (req, res) => {
    try {
      const soonEnds = await db.sequelize.query(
        'SELECT A.*, B.id, B.url, replace(B.url, "../public", "") AS real_url, b.createdAt, b.updatedAt FROM (SELECT A.*, B.name FROM (SELECT A.product_id, A.cobuying_room_id, B.title, A.current_demand FROM sell AS A LEFT JOIN cobuying_room AS B ON A.cobuying_room_id=B.id WHERE B.state="deposit") AS A LEFT JOIN product AS B ON A.product_id=B.id) AS A LEFT JOIN image AS B ON A.product_id=B.product_id;'
      );
      const cntsoonEnd = await CobuyingRoom.count({
        where: {
          state: "deposit",
        },
      });
      res.render("CoBuyRoom/soonEnd", { soonEnds: soonEnds[0], count: cntsoonEnd });
    } catch (error) {
      console.log(error);
    }
  },
  suyoStat: async (req, res) => {
    try {
      const CobuyroomID = req.params.id;
      const suyoStats = await db.sequelize.query(
        'SELECT A.*, B.*, replace(B.url, "../public", "") AS real_url FROM (SELECT A.*, B.`name` FROM (SELECT A.`product_id`, A.`cobuying_room_id`, B.`title`, A.`current_demand`, A.`min_demand` FROM sell AS A LEFT JOIN cobuying_room AS B ON A.`cobuying_room_id`=B.`id`) AS A LEFT JOIN product AS B ON A.`product_id`=B.`id`) AS A LEFT JOIN image AS B ON A.product_id=B.product_id;'
      );
      const suyoStat = suyoStats[0].filter((it) => it.cobuying_room_id == CobuyroomID);
      res.render("CoBuyRoom/suyoStat", { suyoStats: suyoStat });
    } catch (error) {
      console.log(error);
    }
  },
  detail: async (req, res) => {
    try {
      const CobuyroomID = req.params.id;
      const details = await db.sequelize.query(
        'SELECT A.*, B.end_at FROM (SELECT A.*, B.id, B.url, B.createdAt, B.updatedAt, replace(B.url, "../public", "") AS real_url FROM (SELECT A.*, B.name FROM (SELECT A.product_id, A.cobuying_room_id, A.price, A.current_demand, B.state, B.description, B.title FROM sell AS A LEFT JOIN cobuying_room AS B ON A.cobuying_room_id=B.id) AS A LEFT JOIN product AS B ON A.product_id=B.id) AS A LEFT JOIN image AS B ON A.product_id=B.product_id) AS A LEFT JOIN deposit_form AS B ON A.cobuying_room_id=B.id;'
      );
      const detail = details[0].filter((it) => it.cobuying_room_id == CobuyroomID);
      if (req.cookies["userToken"] != null) {
        res.render("CoBuyRoom/detail", { details: detail });
      }
    } catch (error) {
      console.log(error);
      // res.render("CoBuyRoom/errorCobuyroom");
    }
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
      req.url = `/CoBuyRoom/${newRoom.id}/newpost`;
      res.redirect(req.url);
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
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
