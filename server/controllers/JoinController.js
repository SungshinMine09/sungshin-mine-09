const db = require("../models/index"),
    User = db.user;

const nodemailer = require("nodemailer");
const senderInfo = require("../config/senderInfo.json");

const verificationCode = Math.floor(100000 + Math.random() * 900000); //랜덤으로 6자리 인증번호 생성
const bcrypt = require("bcrypt"); //비밀번호 암호화. 단방향 암호화. 복호화 불가능. 값 비교만 가능.

let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwtConfig");

/* 성신 지메일 주소 생성 함수 */
function generateEmail(student_number) {
        return student_number + "@" + "sungshin.ac.kr"; //학번만 입력받고, 뒤의 성신 이메일 도메인은 고정시키기.
}

/* 생성된 성신 지메일 주소로 인증번호 이메일을 보내주는 함수 */
async function generateEmailController(req, res) {
    const student_number = req.body.student_number;
    const email = generateEmail(student_number);

    //회원가입의 정보입력 페이지에서 다른 정보들과 학번을 한꺼번에 저장시키기 위해, 잠시 쿠키에 학번 저장
    //쿠키에 저장된 학번 값은 5분 동안 유효. 즉, 5분이 지나면 쿠키에 저장된 학번이 사라져서 회원가입을 할 수 없다.
    await res.cookie('student_number', req.body.student_number, { expires: new Date(Date.now() + 300000) });
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: senderInfo.user,
            pass: senderInfo.pass
        }
    });

    let fieldheader = `인증번호는: ` + verificationCode + `<br> ※인증과 회원가입 유효 시간은 5분입니다.※ <br>`
    const mailOptions = {
        from: senderInfo.user,
        to: email,
        subject: "성신마인 09번지_ 인증번호 메일",
        //text: "인증번호는: " + verificationCode,
        html: fieldheader
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("인증번호 이메일 전송 실패: ", error);
            res.status(500).json({ message: '인증번호 이메일 전송에 실패했습니다.'});
        } else {
            console.log("인증번호 이메일 전송 성공: ", verificationCode);
            res.send("<script>alert('인증번호 전송 완료'); history.back();</script>");
        }
        transporter.close();
    })
}

/* 서버에서 보낸 인증번호와 사용자가 입력한 인증번호가 일치하는지 판단하는 함수 */
function verifyCodeController(req, res) {
    const inputCode = req.body.authNumber; //사용자가 입력한 인증번호 (text라서 문자열(string) 타입)
    const verifyCode = verificationCode; //메일로 보낸 인증번호 (math함수를 써서 숫자(num)타입)


    if (String(verifyCode) && (inputCode === String(verifyCode))) { //string으로 똑같이 타입 맞춰준 후 서로 같은지 비교하기
        res.send("<script>alert('인증 성공'); location.href='/user/JoinStep2';</script>");
    } else {
        res.status(400).json({message: "인증 실패"});
    }
}

/* 회원가입을 수행하는 함수 */
async function registerController(req, res) {
    try {
        console.log(req.body);
        const sameUser = await User.findOne({
            where: {login_id: req.body.ID}, //사용자가 입력한 id가 db에 이미 저장되어있는지 찾기
        });
        if (sameUser) { //만약 이미 저장되어있다면면
            return res.send("<script>alert('이미 존재하는 아이디입니다.'); history.back();</script>");
        }

        if (req.body.password && (req.body.confirm_pw !== req.body.password)) { //비밀번호 입력란과 비밀번호 확인 입력란의 입력값들이 다르다면
            return res.send("<script>alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.'); history.back(); </script>");
        } 
        //일치한다면, 사용자가 입력한 비밀번호를 해쉬값으로 전환
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const date = new Date();
        const components = [
            date.getFullYear(), //4자리 (현재 년도)
            date.getMonth() +1, //1~2자리 (현재 몇월인지. 1월은 0)
            date.getDate(), //1~2자리 (현재 몇일인지)
            date.getHours(), //1~2자리 (현재 몇시인지)
            date.getMinutes(), //1~2자리 (현재 몇분인지)
            date.getSeconds(), //1~2자리 (현재 몇초인지)
            date.getMilliseconds() //1~3자리 (유니크한 값을 위해 천분의 일초로! 0~999)
        ];
        const db_id = components.join(""); //사용자가 현재 가입한 시간을 따와서, db에서 이용할 유저아이디 생성

        await User.create({ //db에 새 유저 테이블 생성(=회원가입)
            id: db_id,
            login_id: req.body.ID,
            password: hashPassword,
            student_number: req.cookies['student_number'],
            phone_number: req.body.phone,
        });
        res.send("<script>alert('회원가입 성공'); location.href='/user/JoinStep3';</script>");
    } catch (err) {
        console.log(err);
        res.send("<script>alert('회원가입 실패. 다시 시도해주세요.'); history.back(); </script>");
    }
}

/* 로그인을 수행하는 함수 */
async function LoginController(req, res) {
    const input_ID = req.body.userID;
    const input_password = req.body.userPassword;

    const findUser = await User.findOne({
        where: {login_id: input_ID},
    });
    if (!findUser) { //만약 사용자가 입력한 아이디가 db에 없다면
        return res.send("<script>alert('존재하지 않는 회원입니다.'); history.back();</script>");
    } 
    else if (findUser) { //만약 사용자가 입력한 아이디가 db에 있다면
        //사용자가 입력한 비밀번호의 hash값과, db에 저장된 비밀번호 hash값이 같은지 비교
        if(bcrypt.compareSync(input_password, findUser['password'])) { 
            //만약 같다면, 로그인과 동시에 토큰 생성 후 쿠키에 저장
            const token = jwt.sign({ login_id: input_ID, db_id: findUser.id }, secretObj.secret);
            //토큰은 1시간 후에 만료. 즉, 1시간이 지나면 사용자는 다시 로그인을 해야한다.
            res.cookie('userToken', token, { httpOnly: true, secure: true, expires: new Date(Date.now() + 3600000) });

            return res.send("<script>alert('로그인 완료!'); location.href='/'; </script>");
        } else {
            return res.send("<script>alert('비밀번호가 일치하지 않습니다.'); history.back();</script>");
        }
    }
}

/* 로그아웃을 수행하는 함수 */
async function LogoutController(req, res) {
    res.clearCookie('userToken'); //쿠키에 저장된 토큰 제거
    await res.send("<script>alert('로그아웃 완료!'); location.href='/'; </script>");
}

module.exports = { generateEmailController, verifyCodeController, registerController, LoginController, LogoutController };