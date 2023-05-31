// -----------------## essential setting ##---------------------
const express = require("express"),
  db = require("./models/index"),
  { sequelize } = require("./models"),
  cookieParser = require("cookie-parser"),
  app = express(),
  layouts = require("express-ejs-layouts");

const bodyParser = require("body-parser");
const morgan = require("morgan"); // npm i morgan

app.use(morgan("dev")); // log every request to the console

// async function createAndLogUser() {
//   const user = await db.user.create({
//     login_id: "twenty",
//     password: "twenty",
//     student_number: "20202020",
//     phone_number: "010-7641-4328",
//   });
//   console.log(user);
// }

// async function createAndLogRoom() {
//   const newRoom = await db.cobuying_room.create({
//     id: 1,
//     title: "test",
//     state: "deposit",
//     description: "더미데이터입니다",
//     host_id: 1,
//   });
//   console.log(newRoom);
// }

// async function createAndForm() {
//   const newForm = await db.deposit_form.create({
//     id: 1,
//     description: "폼 설명 더미 데이터",
//     next_questions_num: 3,
//     questions: {
//       1: "배송 받을 장소를 선택해주세요(현장수령/택배배송)",
//       2: "현장수령이 아닐경우 배송받을 장소(주소, 우편번호, 전화번호)를 입력해주세요",
//     },
//     account: "국민 09-sungshim_mine",
//   });
//   console.log(newForm);
// }

db.sequelize
  .sync({ force: true })
  .then(() => console.log("Database OK"))
//   .then(createAndLogUser)
//   .then(createAndLogRoom)
  .catch((error) => console.error(error));

const homeRouter = require("./routes/homeRoutes");
const userRouter = require("./routes/userRoutes");
const CoBuyRoomRouter = require("./routes/CoBuyRoomRoutes");
const formRouter = require("./routes/CoBuyFormRoutes");
const errorRouter = require("./routes/errorRoutes");

app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  // express.urlencoded({
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(cookieParser());

// ------------------------## route ##---------------------------
app.use("/", homeRouter);
app.use("/index", homeRouter);

app.use("/user", userRouter);

app.use("/CoBuyRoom", CoBuyRoomRouter);

app.use("/CoBuyForm", formRouter);
/* ##가이드
1. 코드 흐름: main.js -> routes -> controller -> ...
2. 코드 통일을 위해 router 반드시 거칠 것! main에서 controller 직접 사용하지 말 것!(불가피한 경우, 팀과 논의)
3.1. view의 모든 html 파일들은 .ejs 확장자로 변경
3.2. view-partials 폴더는 재사용할 컴포넌트를 넣어두는 폴더
3.3. view의 index.ejs는 홈화면
4. 참조 코드: https://github.com/JonathanWexler/get-programming-with-nodejs/tree/master/unit_7/lesson_30/finish/recipe_app
*/

// --------------------------------------------------------------

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
