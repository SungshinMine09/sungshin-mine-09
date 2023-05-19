// -----------------## essential setting ##---------------------
const express = require("express"),
  db = require("./models/index"),
  { sequelize } = require("./models"),
  app = express(),
  layouts = require("express-ejs-layouts");

  db.sequelize
  .sync() // 테이블이 없으면 테이블 생성, 있으면 nothing
  .then(() => console.log("Database OK"))
  .catch((error) => console.error(error));
  
const homeRouter = require("./routes/homeRoutes");
const userRouter = require("./routes/userRoutes");
const CoBuyRoomRouter = require("./routes/CoBuyRoomRoutes");
const errorRouter = require("./routes/errorRoutes");

app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

// ------------------------## route ##---------------------------
app.use("/", homeRouter);
app.use("/index", homeRouter);

app.use("/user", userRouter);

app.use("/CoBuyRoom", CoBuyRoomRouter);

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
