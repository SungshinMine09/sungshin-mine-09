"use strict";

const db = require("../models/index");
const CobuyingRoom = db.cobuying_room;
const Sell = db.sell;
const Product = db.product;
const Image = db.image;
const User = db.user;
const Notification = db.notification;

let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwtConfig");

const verifyAuthController = require("./verifyAuthController");

module.exports = {
  totalGonggu: async (req, res) => {
    try {
      const totalGonggus = await db.sequelize.query(
        'SELECT A.*, B.id, B.url, replace(B.url, "public", "") AS real_url, B.createdAt, B.updatedAt FROM (SELECT A.*, B.name FROM (SELECT A.product_id, A.cobuying_room_id, B.title, A.current_demand FROM sell AS A LEFT JOIN cobuying_room AS B ON A.cobuying_room_id=B.id) AS A LEFT JOIN product AS B ON A.product_id=B.id) AS A LEFT JOIN image AS B ON A.product_id=B.product_id;'
      );
      const cntTotal = await CobuyingRoom.count();
      res.render("CoBuyRoom/totalGonggu", {
        totalGonggus: totalGonggus[0],
        count: cntTotal,
      });
    } catch (error) {
      console.log(error);
    }
  },
  ingSuyo: async (req, res) => {
    try {
      const ingSuyos = await db.sequelize.query(
        'SELECT A.*, B.id, B.url, replace(B.url, "public", "") AS real_url, B.createdAt, B.updatedAt FROM (SELECT A.*, B.name FROM (SELECT A.product_id, A.cobuying_room_id, B.title, A.current_demand FROM sell AS A LEFT JOIN cobuying_room AS B ON A.cobuying_room_id=B.id WHERE B.state="demand") AS A LEFT JOIN product AS B ON A.product_id=B.id) AS A LEFT JOIN image AS B ON A.product_id=B.product_id;'
      );
      const cntingSuyo = await CobuyingRoom.count({
        where: {
          state: "demand",
        },
      });
      res.render("CoBuyRoom/ingSuyo", {
        ingSuyos: ingSuyos[0],
        count: cntingSuyo,
      });
    } catch (error) {
      console.log(error);
    }
  },
  soonEnd: async (req, res) => {
    try {
      const soonEnds = await db.sequelize.query(
        'SELECT A.*, B.id, B.url, replace(B.url, "public", "") AS real_url, B.createdAt, B.updatedAt FROM (SELECT A.*, B.name FROM (SELECT A.product_id, A.cobuying_room_id, B.title, A.current_demand FROM sell AS A LEFT JOIN cobuying_room AS B ON A.cobuying_room_id=B.id WHERE B.state="deposit") AS A LEFT JOIN product AS B ON A.product_id=B.id) AS A LEFT JOIN image AS B ON A.product_id=B.product_id;'
      );
      const cntsoonEnd = await CobuyingRoom.count({
        where: {
          state: "deposit",
        },
      });
      res.render("CoBuyRoom/soonEnd", {
        soonEnds: soonEnds[0],
        count: cntsoonEnd,
      });
    } catch (error) {
      console.log(error);
    }
  },
  suyoStat: async (req, res) => {
    try {
      const form_id = req.params.form_id;
      const CobuyroomID = req.params.id;
      const cobuyroom = await CobuyingRoom.findByPk(CobuyroomID);
      const suyoStats = await db.sequelize.query(
        'SELECT A.*, B.*, replace(B.url, "public", "") AS real_url FROM (SELECT A.*, B.`name` FROM (SELECT A.`product_id`, A.`cobuying_room_id`, B.`title`, A.`current_demand`, A.`min_demand` FROM sell AS A LEFT JOIN cobuying_room AS B ON A.`cobuying_room_id`=B.`id`) AS A LEFT JOIN product AS B ON A.`product_id`=B.`id`) AS A LEFT JOIN image AS B ON A.product_id=B.product_id;'
      );
      const suyoStat = suyoStats[0].filter((it) => it.cobuying_room_id == CobuyroomID);
      res.render("CoBuyRoom/suyoStat", { suyoStats: suyoStat, cobuyroom: cobuyroom, form_id: form_id});
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

  createCoBuyRoomPage: (req, res) => {
    res.render("CoBuyRoom/CreateBuyingPage");
  },

  createCoBuyRoom: async (req, res) => {
    // console.log(req.body);

    try {
      // 현재유저 식별
      const user_id = await verifyAuthController.checkID(req);
      if (!user_id) {
        console.log("current user is null");
        return res.redirect("/");
      }
      // 최소수량은 최대수량보다 클 수 없다
      const min_quantity = Number(req.body.min_demand);
      const max_quantity = Number(req.body.max_quantity);
      console.log(max_quantity);
      console.log(min_quantity);
      if (max_quantity < min_quantity) {
        return res.send("<script>alert('최소수량은 최대수량보다 클 수 없습니다.'); location.href='/CoBuyRoom/createCoBuyRoom'; </script>");
      }
      const newRoom = await CobuyingRoom.create({
        title: req.body.title,
        description: req.body.description,
        host_id: user_id.id,
      });

      const newProduct = await Product.create({
        name: req.body.title,
      });

      const newSell = await Sell.create({
        id: newProduct.id,
        cobuying_room_id: newRoom.id,
        price: req.body.price,
        min_demand: min_quantity,
        min_quantity: min_quantity,
        max_quantity: max_quantity,
      });

      /*   const newSellNotification = await Notifications.create({
        receiver_id:,
        cobuying_room_id: newRoom.id,
        content: ,
        read_or_not: 0,
        type2: 'sell',

      })
*/
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
    const form_id = req.params.form_id;
    res.render("CoBuyForm/DepositFormResultPage");
  },
};
