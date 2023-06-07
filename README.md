<p align="center">
  <img src="https://github.com/SungshinMine09/sungshin-mine-09/assets/67824465/fc7f3646-77ca-40ab-b747-31a05804ed65" style="width:200px; height:200px">
 </p>
 
# 🔮성신마인 09번지✨ (Sungshin_Mine_09)
2023-1학기 성신여자대학교 컴퓨터공학과 서버시스템구축실습 팀프로젝트 4조 (팀명: <b>이거사조</b>)


>🛠️개발기간 : 
><br>2023.3.15 ~ 2023.4.18 (프로젝트 계획, 요구사항 분석, 데이터베이스 설계, 플로우차트 및 와이어프레임 설계)
><br>2023.4.26 ~ 2023.6.7 (프론트엔드 구현 및 백엔드 API 구현)

## 📌목차
1. [성신마인 09번지란?](#성신마인-09번지란)
2. [팀원 소개](#팀원-소개)
3. [배포 주소](#배포-주소)
4. [프로젝트 소개](#프로젝트-소개)
5. [주요 기능](#주요-기능)
6. [화면 구성](#화면-구성)
7. [시작 가이드](#%EF%B8%8F시작-가이드)
8. [기술 스택](#%EF%B8%8F기술-스택)


### 🤔성신마인 09번지란?
- 서비스명 소개
  - <b>성신여자대학교 ***재학생***들이 우리가 만든 웹사이트를 통해서 자신의 마음에 딱 드는 공동구매를 찾았으면(캐냈으면) 하는 마음으로 지은 이름</b>이다. 그래서 광산과, 내꺼라는 의미를 둘 다 가진 <b>'Mine'</b> 이라는 단어가 떠올랐고, 성신여자대학교 재학생들만 참여할 수 있는 특수성을 고려하여, <b>‘성신마인(Sungshin Mine)'</b>이라고 지었다. <br>뒤에 <b>‘09번지’</b>에서 <b>‘09’</b>는 학우들 사이에서 공동구매라는 단어를 줄여서 은어로 '공구'라고도 부르기도 해서 그 부분에서 발음의 유사성을 가지고 온 것이다. 그리고 학우들이 우리가 만든 하나의 웹사이트에 모두 모여 공동구매를 진행하거나 참여하는 것이니까, 우리의 웹사이트가 학우들에게는 장소처럼 느껴질 수도 있겠다는 생각에 <b>'번지'</b>라는 말도 붙여주었다. <br>그래서 <b>'성신마인 09번지'</b>라고 서비스 이름을 지었다.
- 서비스의 목적
  - <b>성신여자대학교 ***재학생***들을 위한 공동구매 웹서비스.</b> <br>학우들이 진행하는 공동구매 절차가 여러 플랫폼에 퍼져있다는 불편함을 개선하기 위해 이러한 서비스를 만들게 되었다.

## 💜팀원 소개
- <b>👑배기연</b>(정보시스템공학과) - 플로우차트 / <b>상품 소개, 수요조사 참여, 새소식 생성 및 확인, 채팅 관련 모든</b> 기능 구현 / QA
- <b>탁유제</b>(컴퓨터공학과) - 플로우차트 / <b>DB 생성, 공동구매방 생성, 입금폼 전과정(제작, 작성, 제출, 계좌 확인, 전체결과 통계)</b> 기능 구현 / 최종발표
- <b>권형미</b>(컴퓨터공학과) - 플로우차트 / <b>마이페이지, 알림페이지</b> 기능 구현 / QA
- <b>손승현</b>(융합보안공학과) - 와이어프레임 / <b>기본 라우팅, 이메일 인증, 회원가입, 로그인+로그아웃, 아이디 찾기+비밀번호 재설정, 아이디/비밀번호 변경</b> 기능 구현 / README 작성 / 배포
- <b>김다현</b>(통계학과) - 와이어프레임 / <b>홈화면, 모든 공동구매 조회(=전체 공구방), 수요조사/마감임박 단계 상품 조회, 수요조사 통계, 공동구매방 삭제</b> 기능 구현 / QA

⚡프로젝트 계획, 요구사항 분석, 데이터베이스 설계 : ***모든 팀원 참여***

## ⭐배포 주소
➡️ http://34.22.79.220
- Google Cloud Platform의 VM인스턴스를 활용하여 배포하였다. 
  - IP를 고정시킨 뒤, 데이터베이스 서버와 웹서버를 분리하였다. <br>MySQL DB 서버 인스턴스 하나, Node.js 웹서버 인스턴스 하나. 이렇게 두 개의 VM 인스턴스를 이용하여 배포하였다.

📺데모 영상 링크 :
https://drive.google.com/file/d/1VHoCAJBAXntbcAifg9qwJr0Vd6IUeABR/view?usp=sharing

## 🔥프로젝트 소개
새학기가 되면, 성신여자대학교의 많은 학생들은 자신이 직접 디자인한 학잠, 새내기 학생들을 위한 과잠, 수강 과목에 필요한 준비물 등을 공동으로 구매하기 위해 커뮤니티(ex. 에브리타임)에 수요조사를 올리고는 한다. 

우리 학교 학생들의 공동구매 과정은 보통, 
  1. 커뮤니티에서 수요조사 게시글을 올려 참여자를 모으고, 
  2. 진행 공지용 카카오톡 방을 만들고, 
  3. 구글 폼으로 입금자를 확인하고, 
  4. 공동구매 물품을 배부하는 과정으로 이루어진다. 

하지만 이러한 과정들이 모두 각각 다른 플랫폼에서 이루어지면서 상당한 불편함을 초래하고 있다. 

뿐만 아니라 대학생들의 대표적인 커뮤니티인 에브리타임에서는 게시글 알림 기능이 없으므로, 수요조사에 참여해도 실제 판매 폼이 열렸을 때 알림을 받을 방법이 없다. 또한 공동구매 관련 게시글이 커뮤니티의 이곳저곳에 흩어져 있기에 참여만 하고 잊어버리기도 쉽다. 

<b>“성신마인 09번지”는 이러한 불편함을 해소하기 위한 서비스이다. 
<br>본 서비스는 진행 중인 공동구매를 한곳에 모아주고, 학우들에게 공동구매 주최 및 참여에 대한 편의를 제공하는 것을 목적으로 한다.</b>

## 👩🏻‍💻주요 기능
### 회원
- 회원가입, 로그인, 아이디 찾기, 비밀번호 재설정, 아이디/비밀번호 변경, 마이페이지, 새소식 알림
### 공동구매방
- 홈화면, 공동구매방 생성 및 삭제(삭제는 only 주최자), 공동구매 상품 상세정보 조회, 모든 공동구매 조회(=전체 공구방), <br>수요조사/마감임박 단계 상품 조회, 수요조사 참여(only 참여자), 수요조사 통계(only 주최자), <br>새소식 생성(only 주최자), 새소식 확인, 채팅방 생성(only 참여자), 채팅 메세지 조회 및 전송 
### 입금폼
- 입금폼 양식 생성(only 주최자), 입금폼 작성(only 참여자), 입금폼 제출(only 참여자), 입금계좌 확인(only 참여자), 입금폼 전체결과 조회(only 주최자)


<p align="center">
<h4>♥️ HLD(High-Level-Design)으로 전체 기능 파악하기🔽 (made by <b>yujetak</b>)</h4>
  <img src="https://github.com/SungshinMine09/sungshin-mine-09/assets/67824465/09e3df85-22e7-43b1-ab7a-8005e161704a" style="width:650px; height:650px">
</p>

## 💻화면 구성


## ⚙️시작 가이드
### 요구사항
- Node.js v18.15.0
- npm v9.5.0
- nvm 1.1.11

### 설치 및 실행 방법
‼️ .env, senderInfo.json, jwtConfig.js 파일은 보안 상 민감한 정보이므로, 해당 repo에 포함되어있지 않습니다.
```cli
(이미 Node.js가 18.15.0 버전이라면, 아래의 두 명령은 생략해도 됩니다.
그렇지 않다면, nvm을 설치한 후, 아래의 두 명령을 실행하는 것을 권장합니다.)
($ nvm install 18.15.0)
($ nvm use 18.15.0)

$ git clone https://github.com/SungshinMine09/sungshin-mine-09.git
$ cd sungshin-mine-09
$ cd server
$ npm install
$ npm start
```

## 🛠️기술 스택
<div align=center><h2>개발</h2></div>
<div align=center>
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/ejs-EE1095?style=for-the-badge&logo=ejs&logoColor=white">
<br>
<img src="https://img.shields.io/badge/Google Cloud-4285F4?style=for-the-badge&logo=Google Cloud&logoColor=white">
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white">
<img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white">
<img src="https://img.shields.io/badge/JSON Web Tokens-000000?style=for-the-badge&logo=JSON Web Tokens&logoColor=white">
</div>

<div align=center><h2>협업</h2></div>
<div align=center>
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white">
<img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
<br>
<h4>회의록 및 개발기록👇🏻</h4>(https://www.notion.so/docs-yuje/9b143de9312b485db13055ae2a097927)
</div>


