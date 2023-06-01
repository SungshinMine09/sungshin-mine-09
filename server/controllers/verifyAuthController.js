const db = require("../models/index"),
  User = db.user,
  Cobuying_room = db.cobuying_room;

let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwtConfig");

function checkAuth(req, res, next) {
  const validToken = req.cookies["userToken"];
  if (validToken == null) {
    return res.send(
      "<script>alert('권한이 없습니다. 다시 로그인해주세요.'); location.href='/user/Login'; </script>"
    );
  } else {
    let decoded = jwt.verify(validToken, secretObj.secret);
    if (decoded) {
      //console.log(decoded.login_id);
      next();
    } else {
      res.send(
        "<script>alert('인증 실패. 다시 로그인해주세요.'); location.href='/user/Login'; </script>"
      );
    }
  }
}

async function checkID(req, res, next) {
  const userToken = req.cookies["userToken"];
  let decodedToken = jwt.verify(userToken, secretObj.secret);
  if (decodedToken) {
    const currentUser = await User.findOne({
      where: { id: decodedToken.db_id },
    });
    return currentUser;
  } else {
    return null;
  }
}

async function checkSeller(req, res, next) {
  const userToken = req.cookies["userToken"];
  let decodedToken = jwt.verify(userToken, secretObj.secret);
  if (decodedToken) {
    const isSeller = await Cobuying_room.findOne({
      where: { host_id: decodedToken.db_id },
    });
    if (isSeller) {
      next();
    } else {
      res.send(
        "<script>alert('잘못된 접근입니다.'); history.back(); </script>"
      );
    }
  }
}

module.exports = { checkAuth, checkID, checkSeller };
