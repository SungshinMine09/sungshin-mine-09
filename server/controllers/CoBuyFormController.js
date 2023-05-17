module.exports = {
  depositFormMaker: (req, res) => {
    res.render("CoBuyForm/depositForm");
  },
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
