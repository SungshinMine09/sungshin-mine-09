module.exports = {
  makeForm: (req, res) => {
    res.render("CoBuyForm/MakeFormPage");
  },
  depositFormSubmit: (req, res) => {
    res.render("CoBuyForm/DepositFormSubmitPage");
  },
  showAccount: (req, res) => {
    res.render("CoBuyForm/ShowAccountPage");
  },
  depositFormResult: (req, res) => {
    res.render("CoBuyForm/DepositFormResultPage");
  },
};
