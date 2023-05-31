// -----------------## essential setting ##---------------------
const express = require("express"),
  db = require("./models/index"),
  { sequelize } = require("./models"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  socketIO = require("socket.io");

db.sequelize
  .sync() // 테이블이 없으면 테이블 생성, 있으면 nothing { alter: true }
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

//등록되지 않은 path에 대한 페이지 오류
app.all("*", function (req, res) {
  res.status(404).send("<h3>ERROR 404 - 페이지를 찾을 수 없습니다.</h3>");
});

/* ##가이드
1. 코드 흐름: main.js -> routes -> controller -> ...
2. 코드 통일을 위해 router 반드시 거칠 것! main에서 controller 직접 사용하지 말 것!(불가피한 경우, 팀과 논의)
3.1. view의 모든 html 파일들은 .ejs 확장자로 변경
3.2. view-partials 폴더는 재사용할 컴포넌트를 넣어두는 폴더
3.3. view의 index.ejs는 홈화면
4. 참조 코드: https://github.com/JonathanWexler/get-programming-with-nodejs/tree/master/unit_7/lesson_30/finish/recipe_app
*/

// --------------------------------------------------------------

const server = app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

module.exports = server;

// socket 서버 실행
const io = socketIO(server, { path: "/socket.io" });
io.on("connection", function (socket) {
  // 새로운 유저 접속을 서버에게 알림
  socket.on("newUser", function () {
    // socket.name = name;
    console.log("유저 접속");
  });

  // 클라이언트가 서버로 메세지 전송
  socket.on("message", function (data) {
    data.name = socket.name;
    console.log(data);

    socket.broadcast.emit("update", data);
  });

  // user connection lost
  socket.on("disconnect", function () {
    console.log(socket.name, "접속 종료");
  });
});
