const db = require("../models/index"),
  User = db.user,
  Cobuying_room = db.cobuying_room;

let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwtConfig");

/* 로그인 여부를 판단하는 미들웨어 */
function checkAuth(req, res, next) {
  const validToken = req.cookies["userToken"]; //쿠키에 저장된 토큰 가져오기
  if (validToken == null) { //토큰이 없다면(= 로그인이 되어있지 않다면)
    return res.send("<script>alert('권한이 없습니다. 다시 로그인해주세요.'); location.href='/user/Login'; </script>");
  } else { //토큰이 있다면(= 로그인이 되어있다면)
    let decoded = jwt.verify(validToken, secretObj.secret); //토큰을 secret 값으로 검증 및 해석하여 저장.
    if (decoded) {
      next(); //토큰이 유효하다면, 로그인한 사람만 접속할 수 있는 페이지를 불러오는 다음 미들웨어 함수 실행
    } else {
      res.send("<script>alert('인증 실패. 다시 로그인해주세요.'); location.href='/user/Login'; </script>");
    }
  }
}

/* 현재 유저 정보를 리턴하는 함수 */
async function checkID(req, res, next) {
  const userToken = req.cookies["userToken"];
  let decodedToken = jwt.verify(userToken, secretObj.secret);
  if (decodedToken) {
    const currentUser = await User.findOne({
      where: { id: decodedToken.db_id }, //현재 로그인한 유저의 토큰의 payload에 저장된 db_id를 추출
    });
    return currentUser;
  } else {
    return null;
  }
}

/* 현재 로그인한 유저가 공동구매의 주최자인지 아닌지를 판별하는 미들웨어 */
async function checkSeller(req, res, next) {
  const userToken = req.cookies["userToken"];
  let decodedToken = jwt.verify(userToken, secretObj.secret);
  
  if (decodedToken) {
      const isSeller = await Cobuying_room.findOne({
      //만약 현재 로그인한 유저의 토큰의 payload에 저장된 db_id가 공동구매방의 주최자 id인 host_id에 있다면 
      where: { host_id: decodedToken.db_id },
    });
    if (isSeller) { //공동구매방의 주최자가 맞으므로, 
      next(); //주최자만 접속할 수 있는 페이지를 불러오는 다음 미들웨어 함수 실행
    } else {
      res.send("<script>alert('잘못된 접근입니다.'); history.back(); </script>");
    }
  }
}

async function checkSellerbyID(req, res, next) {
  const userToken = req.cookies["userToken"];
  let decodedToken = jwt.verify(userToken, secretObj.secret);
  
  if (decodedToken) {
    const CoBuyingRoomID = req.params.id;
    const CoBuyRoom = await Cobuying_room.findByPk(CoBuyingRoomID);

    if(CoBuyRoom.host_id == decodedToken.db_id) {
      next();
    } else {
      res.send("<script>alert('잘못된 접근입니다.'); history.back(); </script>");
    }
  }
}

async function checkSellerbyRoomID (req, res, next) {
  const userToken = req.cookies["userToken"];
  let decodedToken = jwt.verify(userToken, secretObj.secret);
  
  if (decodedToken) {
    const coBuyingRoomID = req.params.room_id;
    const cobuyroom = await Cobuying_room.findByPk(coBuyingRoomID);

    if(cobuyroom.host_id == decodedToken.db_id) {
    next();
    } else {
      res.send("<script>alert('잘못된 접근입니다.'); history.back(); </script>");
    } 
  }
}

async function checkSellerbyFormID (req, res, next) {
  const userToken = req.cookies["userToken"];
  let decodedToken = jwt.verify(userToken, secretObj.secret);
  
  if (decodedToken) {
    const coBuyingFormID = req.params.form_id;
    const cobuy_room = await Cobuying_room.findByPk(coBuyingFormID);

    if(cobuy_room.host_id == decodedToken.db_id) {
      next();
    } else {
      res.send("<script>alert('잘못된 접근입니다.'); history.back(); </script>");
    }
  }
}

module.exports = { checkAuth, checkID, checkSeller, checkSellerbyID, checkSellerbyRoomID, checkSellerbyFormID };
