function init() {
  DrawAll();
  DrawBeginParam();
  DrawScore();
}

function ClearCenter() {
  var pan = document.querySelector("#ground");
  var pantx = pan.getContext("2d");
  pantx.clearRect(0, 0, 600, 600);
}

function DrawCenter() {
  var left = 180, top = 180, right = 420, bottom = 420;
  var h1 = top + (bottom-top)/3, h2 = top + (bottom-top)*2/3;
  var v1 = left + (right-left)/3, v2 = left + (right-left)*2/3;
  var radius = 35, space = 10;

  var pan = document.querySelector("#ground");
  var pantx = pan.getContext("2d");

  pantx.beginPath();
  pantx.lineWidth = 4;
  pantx.globalAlpha = 1;
  pantx.strokeStyle = "white";
  pantx.moveTo(left+radius, top);
  pantx.lineTo(right-radius, top);
  pantx.moveTo(left+radius, bottom);
  pantx.lineTo(right-radius, bottom);
  pantx.moveTo(left, top+radius);
  pantx.lineTo(left, bottom-radius);
  pantx.moveTo(right, top+radius);
  pantx.lineTo(right, bottom-radius);

  pantx.arc(right-radius, bottom-radius, radius, 0, 0.5*Math.PI);
  pantx.arc(left+radius, bottom-radius, radius, 0.5*Math.PI, Math.PI);
  pantx.arc(left+radius, top+radius, radius, Math.PI, 1.5*Math.PI);
  pantx.arc(right-radius, top+radius, radius, 1.5*Math.PI, 2*Math.PI);

  pantx.stroke();

  pantx.beginPath();
  pantx.lineWidth = 2;
  pantx.globalAlpha = 0.8;
  pantx.moveTo(left+space, h1);
  pantx.lineTo(right-space, h1);
  pantx.moveTo(left+space, h2);
  pantx.lineTo(right-space, h2);
  pantx.moveTo(v1, top+space);
  pantx.lineTo(v1, bottom-space);
  pantx.moveTo(v2, top+space);
  pantx.lineTo(v2, bottom-space);
  pantx.stroke();
}

function DrawBlackBall() {
  for (let bb of enemy) {
    bb.Draw();
  }
}

function DrawAll() {
  ClearCenter();
  DrawCenter();
  if(smallRect.isvalid){
    smallRect.Draw();
  }
  mBall.Draw();
  DrawBlackBall();
}

function DrawBeginParam() {
  var pa = document.querySelector("#param");
  var patx = pa.getContext("2d");
  patx.globalAlpha = 0.6;
  patx.fillStyle = "white";
  patx.fillRect(0, 0, 360, 360);

  //word
  patx.textAlign = "center";
  patx.fillStyle = "rgb(40, 196, 136)";
  patx.font = "50px Verdana";
  patx.globalAlpha = 1;
  patx.fillText("SMOVE", 180, 100);
  patx.font = "25px Consolas";
  patx.fillText("Press any key to start", 180, 240);
  let info = "Use direction key to play";
  patx.fillText(info, 180, 280);
  patx.fillText("Use space to pause", 180, 320);
}

function DrawOverParam() {
  var pa = document.querySelector("#param");
  var patx = pa.getContext("2d");
  patx.globalAlpha = 0.6;
  patx.fillStyle = "white";
  patx.fillRect(0, 0, 360, 360);

  //word
  patx.textAlign = "center";
  patx.fillStyle = "rgb(40, 196, 136)";
  patx.font = "40px Verdana";
  patx.globalAlpha = 1;
  patx.fillText("GAME OVER", 180, 100);
  patx.font = "80px Consolas";
  patx.fillText(gameManager.score, 180, 205);
  patx.font = "25px Consolas";
  patx.fillText("Press enter to restart", 180, 270);
}

function ClearParam() {
  if (!gameManager.isPaused) {
    var pa = document.querySelector("#param");
    var patx = pa.getContext("2d");
    patx.clearRect(0, 0, 360, 360);
  }
}

function DrawScore() {
  var sa = document.querySelector("#score");
  var satx = sa.getContext("2d");
  satx.globalAlpha = 1;
  satx.fillStyle = "white";
  satx.textAlign = "center";
  satx.font = "30px Verdana";
  satx.fillText("Best: " + gameManager.best, 100, 30);
  satx.font = "75px Verdana";
  satx.fillText(gameManager.score, 100, 110);
}

function ClearScore() {
  if (!gameManager.isPaused) {
    var sa = document.querySelector("#score");
    var satx = sa.getContext("2d");
    satx.clearRect(0, 0, 200, 180);
  }
}