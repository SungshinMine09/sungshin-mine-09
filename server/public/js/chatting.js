let socket = io();

socket.on("connect", function () {
  let data_div = document.getElementsByClassName("data_div").item(0);
  let user_id = data_div.dataset.user_id;
  socket.emit("newUser", { user_id: user_id });
});

// 서버에서 데이터 받기
socket.on("update", function (data) {
  let data_div = document.getElementsByClassName("data_div").item(0);
  let chatroom_id = data_div.dataset.chatroom_id;

  // 채팅이 수신되어야 하는 채팅방에만 메세지 띄워주기
  if (chatroom_id == data.chatroom_id) {
    // ejs에 메세지박스 생성
    let chattingBox = document.getElementById("chattingBox");

    let chattingFromYou = document.createElement("div");
    let imgDiv = document.createElement("div");
    let img = document.createElement("img");
    let msgDiv = document.createElement("div");
    let messageBox = document.createElement("div");
    let date = document.createElement("div");
    let msgNode = document.createTextNode(`${data.message}`);
    let dateNode = document.createTextNode(`moment(${data.date}).format("YY/MM/DD HH:mm")`);

    chattingFromYou.classList.add("chattingFromYou");
    chattingFromYou.classList.add("flex");
    messageBox.classList.add("messageBox");
    date.classList.add("date");
    img.src = "/images/profileImageExample.png";

    chattingBox.appendChild(chattingFromYou);
    chattingFromYou.appendChild(imgDiv);
    imgDiv.appendChild(img);
    chattingFromYou.appendChild(msgDiv);
    msgDiv.appendChild(messageBox);
    msgDiv.appendChild(date);
    messageBox.appendChild(msgNode);
    date.appendChild(dateNode);
  }
});

function send() {
  let message = document.getElementById("message").value;
  document.getElementById("message").value = "";
  let data_div = document.getElementsByClassName("data_div").item(0);

  // ejs에서 데이터 받아오기 (현재화면에 메세지 생성 및 서버로 전송)
  let chatroom_id = data_div.dataset.chatroom_id;
  let cobuying_room_id = data_div.dataset.cobuying_room_id;
  let user_id = data_div.dataset.user_id;
  let host_id = data_div.dataset.host_id;
  let guest_id = data_div.dataset.guest_id;
  let receiver_id = user_id == host_id ? guest_id : host_id; // 유저 아이디와 호스트 아이디를 비교하여 알림을 받아야 하는 아이디를 구분한다

  //   입력한 데이터로 ejs에 메세지 생성
  currentTime = moment().format("YY/MM/DD HH:mm");
  let chattingBox = document.getElementById("chattingBox");

  let chattingFromMe = document.createElement("div");
  let imgDiv = document.createElement("div");
  let img = document.createElement("img");
  let msgDiv = document.createElement("div");
  let messageBox = document.createElement("div");
  let date = document.createElement("div");
  let msgNode = document.createTextNode(`${message}`);
  let dateNode = document.createTextNode(currentTime);

  chattingFromMe.classList.add("chattingFromMe");
  chattingFromMe.classList.add("flex");
  messageBox.classList.add("messageBox");
  date.classList.add("date");
  img.src = "/images/profileImageExample.png";

  chattingBox.appendChild(chattingFromMe);
  chattingFromMe.appendChild(imgDiv);
  imgDiv.appendChild(img);
  chattingFromMe.appendChild(msgDiv);
  msgDiv.appendChild(messageBox);
  msgDiv.appendChild(date);
  messageBox.appendChild(msgNode);
  date.appendChild(dateNode);

  // 서버로 message 이벤트 전달 + 데이터와 함께
  socket.emit("message", { type: "message", message: message, chatroom_id: chatroom_id, cobuying_room_id: cobuying_room_id, user_id: user_id, receiver_id: receiver_id, date: currentTime });
}

function changeChatroom(elem) {
  let data_div = document.getElementsByClassName("data_div").item(0);
  let cobuying_room_id = data_div.dataset.cobuying_room_id;

  login_id = elem.innerText;
  window.location.href = `/CoBuyRoom/${cobuying_room_id}/chatting/${login_id}`;
}
