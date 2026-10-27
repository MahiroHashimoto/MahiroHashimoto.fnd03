
const message = document.getElementById("message");
const start = document.getElementById("start");
const first = document.getElementById("first");
const hands = document.getElementById("hands");
const battle = document.getElementById("battle");
const result = document.getElementById("result");
const retry = document.getElementById("retry");
const count = document.getElementById("count");
const retitle = document.getElementById("retitle");

const wincountapp = document.getElementById("wincountapp");
const losecountapp = document.getElementById("losecountapp");
const drawcount = document.getElementById("drawcountapp");

const myImage = document.getElementById("myImage");
const computerImage = document.getElementById("computerImage");

const handButtons = document.querySelectorAll(".hand");

const handList = [
  { name: "グー", image: "janken_gu.png" },
  { name: "チョキ", image: "janken_choki.png" },
  { name: "パー", image: "janken_pa.png" }
];

let computerHand = null;

//勝ち数・負け数
let winCount = 0;
let loseCount = 0;
let drawCount = 0;

// カウント表示を更新する
function updateCount() {
  wincountapp.textContent = winCount;
  losecountapp.textContent = loseCount;
  drawcountapp.textContent = drawCount;
}


// スタートを押したとき
start.addEventListener("click", function () {
  message.textContent = "最初はグー";

  start.hidden = true;
  first.hidden = false;
  hands.hidden = true;
  battle.hidden = true;
  retry.hidden = true;
  retitle.hidden = true;
  count.hidden = true;
  result.textContent = "";

  // 最初はグーの画像を表示
  first.querySelector("img").src = "janken_gu.png";

  setTimeout(function () {
    // じゃんけんポンのタイミングで相手の手を決定
    computerHand =
      handList[Math.floor(Math.random() * handList.length)];

    message.textContent = "じゃんけんポン！";

    // グーの画像を隠し、相手の手を表示
    first.hidden = true;
    computerImage.src = computerHand.image;
    myImage.src = "janken_gu.png";

    battle.hidden = true;
    hands.hidden = false;
    count.hidden = true;

  }, 1000);
});

// 自分の手を選んだとき
handButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const myHand = button.dataset.hand;

    const selectedHand = handList.find(function (hand) {
      return hand.name === myHand;
    });

    myImage.src = selectedHand.image;

    let judge;

    if (myHand === computerHand.name) {
      judge = "あいこ！😑";
      drawCount++;

    } else if (
      (myHand === "グー" && computerHand.name === "チョキ") ||
      (myHand === "チョキ" && computerHand.name === "パー") ||
      (myHand === "パー" && computerHand.name === "グー")
    ) {
      judge = "あなたの勝ち！😊";
      winCount++;
    } else {
      judge = "あなたの負け！😒";
      loseCount++;
    }

    updateCount();
   
  
    result.textContent =
      "あなた：" + myHand +
      "\n相手：" + computerHand.name +
      "\n" + judge;

    battle.hidden =  false;
    hands.hidden = true;
    retry.hidden = false;
    retitle.hidden = false;
    count.hidden = false;
  });
});

// もう一度じゃんけんをするとき
retry.addEventListener("click", function () {
  message.textContent = "最初はグー";

  battle.hidden = true;
  result.textContent = "";
  retry.hidden = true;
  retitle.hidden = true;
  hands.hidden = true;
  first.hidden = false;
  count.hidden = true;

  first.querySelector("img").src = "janken_gu.png";

  setTimeout(function () {
    computerHand =
      handList[Math.floor(Math.random() * handList.length)];

    message.textContent = "じゃんけんポン！";

    first.hidden = true;
    computerImage.src = computerHand.image;
    myImage.src = "janken_gu.png";

    battle.hidden = true;
    hands.hidden = false;
    count.hidden = true;
    
  }, 1000);
});

//タイトルに戻るとき
retitle.addEventListener("click",function(){
  start.hidden = false;
  first.hidden = true;
  hands.hidden = true;
  battle.hidden = true;
  retry.hidden = true;
  retitle.hidden = true;
  count.hidden = true;
  result.textContent = "";

  window.location.reload();

});

