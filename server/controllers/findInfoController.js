const db = require("../models/index"),
    User = db.user;

const nodemailer = require("nodemailer");
const senderInfo = require("../config/senderInfo.json");

const verificationCode = Math.floor(100000 + Math.random() * 900000); //랜덤으로 6자리 인증번호 생성
const bcrypt = require("bcrypt"); //비밀번호 암호화. 단방향 암호화. 복호화 불가능. 값 비교만 가능.

let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwtConfig");



function generateEmail(student_number) {
        return student_number + "@" + "sungshin.ac.kr";
}

async function generateEmailController(req, res) {
    const student_number = req.body.student_number;
    //const email_domain = req.body.email_domain; //사용자가 입력한 form 데이터에서 학번과 학교 이메일 도메인 추출
    //const email = generateEmail(student_number, email_domain); //추출 후 합쳐서 이메일 주소 생성
    const email = generateEmail(student_number);

    await res.cookie('student_number', req.body.student_number, { expires: new Date(Date.now() + 300000) });//5분 동안 유효
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: senderInfo.user,
            pass: senderInfo.pass
        }
    });

   // let fieldheader = `인증번호는: ` + verificationCode + `<br> ※인증과 회원가입 유효 시간은 5분입니다.※ <br>`
    const mailOptions = {
        from: senderInfo.user,
        to: email,
        subject: "성신마인 09번지_ 인증번호 메일",
        text: "인증번호는: " + verificationCode + "입니다.",
        //html: fieldheader
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

function verifyCodeController_ID(req, res) {
    const inputCode = req.body.authNumber; //사용자가 입력한 인증번호 (text라서 문자열(string) 타입)
    const verifyCode = verificationCode; //메일로 보낸 인증번호 (math함수를 써서 숫자(num)타입)


    if (String(verifyCode) && (inputCode === String(verifyCode))) { //string으로 똑같이 타입 맞춰준 후 서로 같은지 비교하기
        res.send("<script>alert('인증 성공'); location.href='/user/getIDbyEmail';</script>");
    } else {
        res.status(400).json({message: "인증 실패"});
    }
}

function verifyCodeController_PW(req, res) {
    const inputCode = req.body.authNumber; //사용자가 입력한 인증번호 (text라서 문자열(string) 타입)
    const verifyCode = verificationCode; //메일로 보낸 인증번호 (math함수를 써서 숫자(num)타입)


    if (String(verifyCode) && (inputCode === String(verifyCode))) { //string으로 똑같이 타입 맞춰준 후 서로 같은지 비교하기
        res.send("<script>alert('인증 성공'); location.href='/user/newPW';</script>");
    } else {
        res.status(400).json({message: "인증 실패"});
    }
}


async function getIDbyEmailController (req, res) {
    const student_number = req.cookies['student_number'];
    //const email_domain = req.body.email_domain; //사용자가 입력한 form 데이터에서 학번과 학교 이메일 도메인 추출
    //const email = generateEmail(student_number, email_domain); //추출 후 합쳐서 이메일 주소 생성
    const email = generateEmail(student_number);

    const findUser = await User.findOne({
        where: {student_number: req.cookies['student_number']},
    });
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: senderInfo.user,
            pass: senderInfo.pass
        }
    });

    const mailOptions = {
        from: senderInfo.user,
        to: email,
        subject: "성신마인 09번지_ 아이디 찾기",
        text: "귀하의 아이디는: " + findUser.login_id + "입니다.",
        //html: fieldheader
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("아이디 이메일 전송 실패: ", error);
            res.status(500).json({ message: '아이디 이메일 전송에 실패했습니다.'});
        } else {
            console.log("아이디 이메일 전송 성공: ", verificationCode);
            res.send("<script>alert('아이디 이메일 전송 완료'); location.href='/user/Login'; </script>");
        }
        transporter.close();
    })
}

async function newPasswordController(req, res) {
    try {
        console.log(req.body);
        const findUser = await User.findOne({
            where: {login_id: req.body.ID},
        });
        if (!findUser) {
            return res.send("<script>alert('입력하신 아이디가 기존 아이디와 일치하지 않습니다.'); history.back();</script>");
        }

        if (req.body.newPassword && (req.body.confirm_newPW !== req.body.newPassword)) {
            return res.send("<script>alert('입력하신 새 비밀번호가 일치하지 않습니다. 다시 입력해주세요.'); history.back(); </script>");
        }
            
        const newHashPassword = await bcrypt.hash(req.body.newPassword, 10);

            
        await User.update({
            password: newHashPassword,
        }, { where: {login_id: req.body.ID}});
        res.send("<script>alert('새 비밀번호 저장 성공'); location.href='/user/Login'; </script>");

    } catch (err) {
        console.log(err);
        res.send("<script>alert('새 비밀번호 저장 실패. 다시 시도해주세요.'); history.back(); </script>");
    }
}

async function changePasswordController(req, res) {
    try {
        console.log(req.body);
        input_oldPassword = req.body.old_pw;

        const userToken = req.cookies["userToken"];
        let decodedToken = jwt.verify(userToken, secretObj.secret);
        if (decodedToken) {
        const findUser = await User.findOne({
            where: {login_id: decodedToken.login_id},
        });

        /*if (!findUser) {
            return res.send("<script>alert('기존 아이디가 일치하지 않습니다.'); history.back();</script>");
        }*/

        if(bcrypt.compareSync(input_oldPassword, findUser['password'])) {
            if(req.body.newPassword && (input_oldPassword === req.body.newPassword) || req.body.confirm_newPW && (input_oldPassword === req.body.confirm_newPW)) {
                return res.send("<script>alert('입력하신 새 비밀번호가 기존 비밀번호와 같습니다. 다시 입력해주세요.'); history.back(); </script>");
            }
            if (req.body.newPassword && (req.body.confirm_newPW !== req.body.newPassword)) {
                return res.send("<script>alert('입력하신 새 비밀번호가 일치하지 않습니다. 다시 입력해주세요.'); history.back(); </script>");
            } else {
                const newHashPassword = await bcrypt.hash(req.body.newPassword, 10);
                await User.update({
                    password: newHashPassword,
                    }, { where: {login_id: decodedToken.login_id}});
                res.send("<script>alert('비밀번호 변경 성공. 로그아웃 될 예정이니 새 비밀번호로 다시 로그인해주세요.'); location.href='/user/Logout'; </script>");
            }
        } else {
            return res.send("<script>alert('기존 비밀번호가 일치하지 않습니다.'); history.back();</script>");
        }
    } else {
        res.send("<script>alert('인증 실패. 다시 로그인해주세요.'); location.href='/user/Login'; </script>");
    }
        } catch (err) {
        console.log(err);
        res.send("<script>alert('비밀번호 변경 실패. 다시 시도해주세요.'); history.back(); </script>");
    }
}

async function changeIDController(req, res) {
    try {
        console.log(req.body);

        const userToken = req.cookies["userToken"];
        let decodedToken = jwt.verify(userToken, secretObj.secret);

        if (decodedToken) {
            const sameUser = await User.findOne({
                where: {login_id: req.body.newID},
            });
            if (sameUser) {
                return res.send("<script>alert('이미 존재하는 아이디입니다.'); history.back();</script>");
            } else {
                const new_ID = req.body.newID;
                await User.update({
                    login_id: new_ID,
                }, { where: {login_id: decodedToken.login_id}});
                res.send("<script>alert('아이디 변경 성공. 로그아웃 될 예정이니 새 아이디로 다시 로그인해주세요.'); location.href='/user/Logout'; </script>");
            }
        
        } else {
            res.send("<script>alert('인증 실패. 다시 로그인해주세요.'); location.href='/user/Login'; </script>");
        }
    }
    catch (err) {
        console.log(err);
        res.send("<script>alert('비밀번호 변경 실패. 다시 시도해주세요.'); history.back(); </script>");
    }
}

module.exports = { generateEmailController, verifyCodeController_ID, getIDbyEmailController, verifyCodeController_PW, newPasswordController, changePasswordController, changeIDController};