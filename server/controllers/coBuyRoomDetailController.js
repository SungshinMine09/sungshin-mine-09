const db = require("../models/index"),
  CoBuyingRoom = db.cobuying_room,
  Sell = db.sell,
  Product = db.product,
  Image = db.image,
  DepositForm = db.deposit_form;

module.exports = {
  index: async (req, res, next) => {
    try {
      // 쿼리스트링으로 id를 받아 해당하는 공구방 데이터를 꺼내 사용한다
      const coBuyingRoomID = req.params.id;

      const cobuyroom = await CoBuyingRoom.findByPk(coBuyingRoomID);
      const sell = await Sell.findOne({
        where: {
          cobuying_room_id: coBuyingRoomID,
        },
      });
      const product = await Product.findOne({
        where: {
          id: sell.product_id,
        },
      });
      const image = await Image.findOne({
        where: {
          product_id: product.id,
        },
      });
      // const depositForm = await DepositForm.findOne({
      //   where: {
      //     cobuying_room_id: coBuyingRoomID,
      //   },
      // });

      res.locals.cobuyroom = cobuyroom;
      res.locals.sell = sell;
      res.locals.product = product;
      res.locals.image = image;
      // res.locals.depositForm = depositForm;
      next();
    } catch (error) {
      console.log(`Error fetching coBuyroomDetail: ${error.message}`);
      next(error);
    }
  },
  indexView: async (req, res) => {
    res.render("CoBuyRoom/detail");
  },
  newpost: (req, res) => {
    res.render("CoBuyRoom/newpost");
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
    res.locals.redirect = `/CoBuyForm/:form_id/depositFormResult`;
  },
  updateCurrentDemand: async (req, res, next) => {
    // current_demand 업데이트
    const coBuyingRoomID = req.params.id;
    const sell = await Sell.findOne({
      where: {
        cobuying_room_id: coBuyingRoomID,
      },
    });

    Sell.increment(
      { current_demand: 1 },
      {
        where: {
          product_id: sell.product_id,
          cobuying_room_id: sell.cobuying_room_id,
        },
      }
    )
      .then(() => {
        // 동일 페이지로 리다이렉트
        res.locals.redirect = `/CoBuyRoom/${coBuyingRoomID}/detail/`;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching coBuyroomDetail: ${error.message}`);
        next(error);
      });
  },
  deleteCoBuyRoom: async (req, res, next) => {
    const coBuyingRoomID = req.params.id;
    //
    // await CoBuyingRoom.destroy({
    //   where: {
    //     id: coBuyingRoomID,
    //   },
    // });
    res.render("home/index");
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
};
