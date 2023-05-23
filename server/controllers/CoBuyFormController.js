const db = require("../models/");
const DepositForm = db.deposit_form;

module.exports = {
  //get
  depositFormMaker: async (req, res) => {
    res.render(`CoBuyForm/depositFormMaker`);

    console.log(req.params.room_id);
  },
  //post
  depositFormMake: async (req, res) => {},
  addQuestion: (req, res) => {},
  depositFormSubmit: (req, res) => {
    res.render("CoBuyForm/depositFormSubmit");
  },
  showAccount: (req, res) => {
    res.render("CoBuyForm/showAccount");
  },
  depositFormResult: (req, res) => {
    res.render("CoBuyForm/depositFormResult");
  },
};
