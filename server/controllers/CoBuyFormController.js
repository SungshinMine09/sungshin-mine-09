const db = require("../models/");
const { sequelize } = require("../models");
const DepositForm = db.deposit_form;

const initForm = async (req, res) => {
  const newFormId = req.params.room_id;
  try {
    await DepositForm.create({
      id: newFormId,
      description: "입금폼 작성 후 다음 화면에서 보이는 계좌에 입금해주세요🙏",
      next_questions_num: 3,
      questions: {
        1: "배송 받을 장소를 선택해주세요(현장수령/택배배송)",
        2: "현장수령이 아닐경우 배송받을 장소(주소, 우편번호, 전화번호)를 입력해주세요",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  //get
  depositFormMaker: async (req, res) => {
    await initForm(req, res);
    const deposit_form = await DepositForm.findOne({
      where: { id: req.params.room_id },
    });
    res.render("CoBuyForm/depositFormMaker", { deposit_form: deposit_form });
  },
  //post
  depositFormMake: async (req, res) => {},
  //post
  add: async (req, res) => {
    const form_id = req.params.form_id;
    try {
      const deposit_form = await DepositForm.findOne({
        where: { id: form_id },
      });

      const new_value = req.body.question;
      if (deposit_form && new_value) {
        const new_key = deposit_form
          .getDataValue("next_questions_num")
          .toString();
        // const old_questions = deposit_form.getDataValue("questions");

        const new_questions = {
          ...deposit_form.questions,
          [new_key]: new_value,
        };

        deposit_form.setDataValue("questions", new_questions);
        await deposit_form.save();
        deposit_form.setDataValue("next_questions_num", Number(new_key) + 1);
        await deposit_form.save();
      }
      res.render("CoBuyForm/depositFormMaker", { deposit_form: deposit_form });
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  },

  edit: async (req, res) => {
    const form_id = req.params.form_id;
    const key = req.query.key;
    const value = req.body.value;
    console.log(`key: ${key} value: ${value} form_id: ${form_id}`);
    try {
      const deposit_form = await DepositForm.findOne({
        where: { id: form_id },
      });
      if (!value) {
        res.render("CoBuyForm/depositFormMaker", {
          deposit_form: deposit_form,
        });
      }
      const new_questions = {
        ...deposit_form.questions,
      };
      new_questions[key] = value;
      deposit_form.setDataValue("questions", new_questions);
      await deposit_form.save();
      res.render("CoBuyForm/depositFormMaker", {
        deposit_form: deposit_form,
      });
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    const form_id = req.params.form_id;
    const key = req.query.key;
    try {
      const deposit_form = await DepositForm.findOne({
        where: { id: form_id },
      });
      const new_questions = {
        ...deposit_form.questions,
      };
      delete new_questions[key];
      deposit_form.setDataValue("questions", new_questions);
      await deposit_form.save();
      res.render("CoBuyForm/depositFormMaker", { deposit_form: deposit_form });
    } catch (error) {
      console.log(error);
    }
    res.render(`CoBuyRoom/${form_id}/newPost`);
  },
  //post
  saveAccount: async (req, res) => {
    const account = req.body.account;
    try {
      const currentForm = await DepositForm.findOne({
        where: { id: req.params.room_id },
      });
      if (currentForm && account) {
        await currentForm.update({ account: account });
      }
      console.log(currentForm);
      res.render("CoBuyForm/depositFormMaker", { deposit_form: currentForm });
    } catch (error) {
      console.log(error);
      res.render("/");
    }
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
