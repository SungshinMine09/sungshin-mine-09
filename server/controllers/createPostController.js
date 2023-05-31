const db = require("../models/index"),
  CoBuyingRoom = db.cobuying_room,
  NewPost = db.update_post;

module.exports = {
  index: async (req, res, next) => {
    try {
      // 쿼리스트링으로 id를 받아 해당하는 공구방 데이터를 꺼내 사용한다
      const coBuyingRoomID = req.params.id;

      res.locals.cobuyroomID = coBuyingRoomID;

      next();
    } catch (error) {
      console.log(`Error fetching coBuyRoomCreatePost: ${error.message}`);
      next(error);
    }
  },
  indexView: async (req, res) => {
    res.render("CoBuyRoom/createPost", { isLoggedin: true });
  },
  createPost: async (req, res, next) => {
    const coBuyingRoomID = req.params.id;

    // textarea의 개행 문자를 div의 개행문자로 변환하여 저장
    content = req.body.content;
    content = content.replace(/\n/g, "<br>");

    // 새소식 생성
    NewPost.create({
      title: req.body.title,
      content: content,
      cobuying_room_id: coBuyingRoomID,
    })
      .then(() => {
        // 새소식 페이지로 리다이렉트
        res.locals.redirect = `/CoBuyRoom/${coBuyingRoomID}/newpost/`;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching coBuyroomCreatePost: ${error.message}`);
        next(error);
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
};
