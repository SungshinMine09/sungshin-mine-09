const db = require("../models/");
const { sequelize } = require("../models");
const CoBuyRoom = db.cobuying_room;
const DepositForm = db.deposit_form;
const Answer = db.answer;
const Notification = db.notification;

const verifyAuthController = require("./verifyAuthController");

const initForm = async (req, res) => {
  const newFormId = req.params.room_id;
  try {
    await DepositForm.create({
      id: newFormId,
      description: "dummy data",
      next_questions_num: 3,
      questions: {
        1: "배송 받을 장소를 선택해주세요(현장수령/택배배송)",
        2: "현장수령이 아닐경우 배송받을 장소(주소, 우편번호, 전화번호)를 입력해주세요",
      },
    });

    // create notification
    types = Notification.getAttributes().type2.values;
    user = await verifyAuthController.checkID(req);
    user_id = user.dataValues.id;
    console.log(types);

    Notification.create({
      receiver_id: user_id,
      cobuying_room_id: req.params.room_id,
      content: "입금폼이 생성되었습니다.",
      type2: types[0],
      url: `/CoBuyRoom/${req.params.room_id}`,
    });

    await CoBuyRoom.update(
      {
        state: "deposit",
      },
      { where: { id: req.params.room_id } }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  //get
  depositFormMaker: async (req, res) => {
    await initForm(req, res);
    const form_id = req.params.form_id;
    const deposit_form = await DepositForm.findOne({
      where: { id: req.params.room_id },
    });
    const cobuying_room = await CoBuyRoom.findOne({
      where: { id: req.params.room_id },
    });

    if (!cobuying_room) {
      res.render("CoBuyRoom/createCoBuyRoom");
    }

    res.render("CoBuyForm/depositFormMaker", {
      deposit_form: deposit_form,
      cobuying_room: cobuying_room,
      form_id: form_id,
    });
  },
  //post
  add: async (req, res) => {
    const form_id = req.params.form_id;
    try {
      const deposit_form = await DepositForm.findOne({
        where: { id: form_id },
      });
      const cobuying_room = await CoBuyRoom.findOne({
        where: { id: form_id },
      });
      if (!cobuying_room) {
        res.render("CoBuyRoom/createCoBuyRoom");
      }
      const new_value = req.body.question;
      if (deposit_form && new_value) {
        const new_key = deposit_form.getDataValue("next_questions_num").toString();

        const new_questions = {
          ...deposit_form.questions,
          [new_key]: new_value,
        };

        deposit_form.setDataValue("questions", new_questions);
        await deposit_form.save();
        deposit_form.setDataValue("next_questions_num", Number(new_key) + 1);
        await deposit_form.save();
      }
      // res.render("CoBuyForm/depositFormMaker", {
      //   deposit_form: deposit_form,
      //   cobuying_room: cobuying_room,
      // });
      res.locals.deposit_form = deposit_form;
      res.locals.cobuying_room = cobuying_room;
      return res.redirect("depositFormMaker");
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
      const cobuying_room = await CoBuyRoom.findOne({
        where: { id: form_id },
      });
      if (!cobuying_room) {
        res.render("CoBuyRoom/createCoBuyRoom");
      }
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
      // res.render("CoBuyForm/depositFormMaker", {
      //   deposit_form: deposit_form,
      //   cobuying_room: cobuying_room,
      // });
      res.locals.deposit_form = deposit_form;
      res.locals.cobuying_room = cobuying_room;
      return res.redirect("depositFormMaker");
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
      const cobuying_room = await CoBuyRoom.findOne({
        where: { id: form_id },
      });
      if (!cobuying_room) {
        res.render("CoBuyRoom/createCoBuyRoom");
      }
      let new_questions = {};

      const new_next_questions_num = deposit_form.next_questions_num - 1;
      console.log(`new_next_questions_num: ${new_next_questions_num}`);
      for (let i = 1, j = 1; i < deposit_form.next_questions_num; i++) {
        if (i != Number(key)) {
          new_questions[j] = deposit_form.questions[i];
          j++;
        } else {
          console.log(`i === key: ${i}`);
        }
      }
      await deposit_form.update({ questions: new_questions });
      deposit_form.setDataValue("next_questions_num", new_next_questions_num);
      await deposit_form.save();
      // return res.render("CoBuyForm/depositFormMaker", {
      //   deposit_form: deposit_form,
      //   cobuying_room: cobuying_room,
      // });
      res.locals.deposit_form = deposit_form;
      res.locals.cobuying_room = cobuying_room;
      return res.redirect("depositFormMaker");
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
      const cobuying_room = await CoBuyRoom.findOne({
        where: { id: req.params.room_id },
      });
      if (!cobuying_room) {
        res.render("CoBuyRoom/createCoBuyRoom");
      }
      console.log(currentForm);
      res.render("CoBuyForm/depositFormMaker", {
        deposit_form: currentForm,
        cobuying_room: cobuying_room,
      });
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
      const cobuying_room = await CoBuyRoom.findOne({
        where: { id: form_id },
      });
      if (!cobuying_room) {
        res.redirect("/CoBuyRoom/createCoBuyRoom");
      }
      if (!deposit_form) {
        const user_id = await verifyAuthController.checkID(req);
        if (user_id.id === cobuying_room.host_id) {
          return res.redirect(`/CoBuyForm/${form_id}/depositFormMaker`);
        } else {
          return res.send("<script>alert('공동구매 입금폼이 존재하지 않습니다'); location.href='/CoBuyRoom/totalGonggu'; </script>");
        }
      }
      res.render("CoBuyForm/depositFormSubmit", {
        deposit_form: deposit_form,
        cobuying_room: cobuying_room,
      });
    } catch (error) {
      console.log(error);
      res.redirect(`/CoBuyRoom/${form_id}/newPost`);
    }
  },

  submit: async (req, res) => {
    const form_id = req.params.form_id;
    const answerJSON = req.body;

    try {
      const user_id = await verifyAuthController.checkID(req);
      if (!user_id) {
        console.log("current user is null");
        return res.redirect("/");
      }
      const deposit_form = await DepositForm.findOne({
        where: { id: form_id },
      });
      let new_answer;
      if (deposit_form && answerJSON) {
        new_answer = await Answer.create({
          user_id: user_id.id,
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
    try {
      const form_id = req.params.form_id;
      const deposit_form = await DepositForm.findOne({
        where: { id: form_id },
      });
      console.log(form_id);
 //     const deposit_form = await DepositForm.findOne({
   //     where: { id: req.params.room_id },
     // });
      const cobuying_room = await CoBuyRoom.findOne({
        where: { id: form_id },
      });
      if (!deposit_form) {
        res.render(`CoBuyForm/${form_id}/depositFormMaker`);
      }
      const answers = await Answer.findAll({
        where: {
          id: form_id,
        },
      });
      console.log(answers);
      res.render("CoBuyForm/depositFormResult", {
        deposit_form: deposit_form,
        answers: answers,
        cobuying_room: cobuying_room,
        form_id: form_id,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
