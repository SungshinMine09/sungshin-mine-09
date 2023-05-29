const db = require("../models/");
const { sequelize } = require("../models");
const answer = require("../models/answer");
const DepositForm = db.deposit_form;
const Answer = db.answer;

const initForm = async (req, res) => {
  const newFormId = req.params.room_id;
  try {
    await DepositForm.create({
      id: newFormId,
      description: "위 계좌에 입금해주세요🙏",
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

      let new_questions = {};

      const new_next_questions_num = deposit_form.next_questions_num - 1;
      console.log(`new_next_questions_num: ${new_next_questions_num}`);
      for (let i = 1, j = 1; i < deposit_form.next_questions_num; i++) {
        if (i != Number(key)) {
          new_questions[j] = deposit_form.questions[i];
          j++;
        }
      }
      await deposit_form.update({ questions: new_questions });
      deposit_form.setDataValue("next_questions_num", new_next_questions_num);
      await deposit_form.save();
      return res.render("CoBuyForm/depositFormMaker", {
        deposit_form: deposit_form,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("❌ DELETE error");
    }
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
  writeForm: async (req, res) => {
    const form_id = req.params.form_id;
    try {
      const deposit_form = await DepositForm.findOne({
        where: { id: form_id },
      });
      res.render("CoBuyForm/depositFormSubmit", { deposit_form: deposit_form });
    } catch (error) {
      console.log(error);
      res.redirect(`/CoBuyRoom/${form_id}/newPost`);
    }
  },
  // TODO: get current USER
  submit: async (req, res) => {
    const form_id = req.params.form_id;
    const user_id = req.params.user_id;
    const answerJSON = req.body;

    try {
      const deposit_form = await DepositForm.findOne({
        where: { id: form_id },
      });
      let new_answer;
      if (deposit_form && answerJSON) {
        new_answer = await Answer.create({
          user_id: user_id,
          id: form_id,
          answers: answerJSON,
        });
        res.redirect(`/CoBuyForm/${form_id}/showAccount`);
      }
    } catch (error) {
      console.log(error);
      res.redirect(`/CoBuyRoom/${form_id}/newPost`);
    }
  },
  showAccount: async (req, res) => {
    const form_id = req.params.form_id;
    try {
      const deposit_form = await DepositForm.findOne({
        where: { id: form_id },
      });
      res.render("CoBuyForm/showAccount", { deposit_form: deposit_form });
    } catch (error) {
      console.log(error);
      res.redirect(`/CoBuyRoom/${form_id}/newPost`);
    }
  },
  depositFormResult: async (req, res) => {
    const form_id = req.params.form_id;

    try {
      const deposit_form = await DepositForm.findOne({
        where: { id: form_id },
      });
      const answers = await Answer.findAll({
        where: {
          id: form_id,
        },
      });
      console.log(answers);
      res.render("CoBuyForm/depositFormResult", {
        deposit_form: deposit_form,
        answers: answers,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
