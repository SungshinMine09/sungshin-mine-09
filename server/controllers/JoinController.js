const db = require("../models/index"),
    User = db.user;

const nodemailer = require("nodemailer");
const senderInfo = require("../config/senderInfo.json");

const verificationCode = Math.floor(100000 + Math.random() * 900000); //랜덤으로 6자리 인증번호 생성
const bcrypt = require("bcrypt"); //비밀번호 암호화. 단방향 암호화. 복호화 불가능. 값 비교만 가능.
//const expireDate = new Date(Date.now() + 300000);

let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwtConfig");


function generateEmail(student_number, email_domain) {
    if (email_domain === "sungshin.ac.kr") { //성신여대 학생들만 가입할 수 있게 도메인 제한하기
        return student_number + "@" + email_domain;
    } else {
        return ("성신여자대학교의 학교 도메인을 입력해주세요."); 
        //근데 왜 이 문구가 아니라...에러 문자가 뜨는 거지...
    }
}

async function generateEmailController(req, res) {
    const student_number = req.body.student_number;
    const email_domain = req.body.email_domain; //사용자가 입력한 form 데이터에서 학번과 학교 이메일 도메인 추출
    const email = generateEmail(student_number, email_domain); //추출 후 합쳐서 이메일 주소 생성

    /*const sameStudentNum = await User.findOne({
        where: { student_number: req.body.student_number },
    });
    if(sameStudentNum) return res.send("<script>alert('이미 가입한 학번입니다.'); history.back();</script>");*/
    await res.cookie('student_number', req.body.student_number, { expires: new Date(Date.now() + 300000) });//5분 동안 유효
    //await console.log(req.cookies['student_number']);
    
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
    //return req.session.verificationCode;
    //res.redirect("/user/JoinStep1");
    //res.json({ student_number: student_number, email: email, code: verificationCode});
    //return verificationCode;
   //res.render("user/JoinPage_1", { student_number: email_IDnumber, email: email });
}

function verifyCodeController(req, res) {
    const inputCode = req.body.authNumber; //사용자가 입력한 인증번호 (text라서 문자열(string) 타입)
    const verifyCode = verificationCode; //메일로 보낸 인증번호 (math함수를 써서 숫자(num)타입)
    
    //console.log(inputCode, typeof(inputCode), verifyCode, typeof(verifyCode));

    if (String(verifyCode) && (inputCode === String(verifyCode))) { //string으로 똑같이 타입 맞춰준 후 서로 같은지 비교하기
        res.send("<script>alert('인증 성공'); location.href='/user/JoinStep2';</script>");
    } else {
        res.status(400).json({message: "인증 실패"});
    }
}

/*function findSameUser(req, res) {
    const sameUser = User.findOne({
        where: {login_id: req.body.ID},
    });
    if(sameUser) return res.send("<script>alert('이미 존재하는 아이디입니다.'); history.back();</script>");
}

function comparePassword(req, res) {
    const hashPassword = bcrypt.hash(req.body.password, 10);
    const confirmPassword = bcrypt.hash(req.body.confirm_pw, 10);
        if (String(hashPassword) && (String(confirmPassword) === String(hashPassword))) {
            res.send("<script>alert('비밀번호 일치'); history.back(); </script>");
        } else {
            res.send("<script>alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.'); history.back(); </script>");
        }
}*/

async function registerController(req, res) {
    try {
        console.log(req.body);
        const sameUser = await User.findOne({
            where: {login_id: req.body.ID},
        });
        if (sameUser) {
            return res.send("<script>alert('이미 존재하는 아이디입니다.'); history.back();</script>");
        }
        //await findSameUser();

        if (req.body.password && (req.body.confirm_pw !== req.body.password)) {
            return res.send("<script>alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.'); history.back(); </script>");
        } 
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        /*if (expireDate) {
            return res.send("<script>alert('유효시간 만료. 다시 시도해주세요.'); history.back();</script>");
        }*/
        /*const confirmPassword = await bcrypt.hash(req.body.confirm_pw, 10);
        console.log(hashPassword, confirmPassword);*/
        //await comparePassword();

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
        const db_id = components.join("");

        await User.create({
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

async function LoginController(req, res) {
    const input_ID = req.body.userID;
    const input_password = req.body.userPassword;

    const findUser = await User.findOne({
        where: {login_id: input_ID},
    });
    if (!findUser) {
        return res.send("<script>alert('존재하지 않는 회원입니다.'); history.back();</script>");
    } 
    else if (findUser) {
        if(bcrypt.compareSync(input_password, findUser['password'])) {
            const token = jwt.sign({ login_id: input_ID }, secretObj.secret);
            res.cookie('userToken', token, { httpOnly: true, secure: true, expires: new Date(Date.now() + 3600000) }); //1시간 후에 만료

            return res.send("<script>alert('로그인 완료!'); location.href='/'; </script>");
        } else {
            return res.send("<script>alert('비밀번호가 일치하지 않습니다.'); history.back();</script>");
        }
    }
}

async function LogoutController(req, res) {
    res.clearCookie('userToken');
    res.send("<script>alert('로그아웃 완료!'); location.href='/'; </script>");
}

module.exports = { generateEmailController, verifyCodeController, registerController, LoginController, LogoutController };