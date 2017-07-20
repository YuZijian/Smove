//main timer of this game
var m_timer;
var bbcount = 0; //control blackball

function GameBegin() {
  //clear the begin or end param
  ClearParam();

  DrawAll();
  do{
    smallRect.randomBorn();
  }while(smallRect.row == mBall.row && smallRect.col == mBall.col)
  smallRect.updatePos();
  smallRect.color = "rgb(25, 104, 179)";
  smallRect.isvalid = true;
  DrawLevel();
  m_timer = setInterval("Smove()", 10);
}

function Smove() {
  //judge if crash
  let maxdis = 45; //smaller than sum of 2 radius
  for (let bb of enemy) {
    let dx = mBall.posX - bb.posX + 180;
    let dy = mBall.posY - bb.posY + 180;
    var dis = Math.sqrt(dx*dx + dy*dy);
    if (dis < maxdis) {
      GameOver();
      DrawAll();
      return;
    }
  }

  //white ball touch the rect
  if (smallRect.isvalid == true && mBall.row == smallRect.row && mBall.col == smallRect.col) {
    smallRect.Clear();
    smallRect.isvalid = false;
    gameManager.addScore();
    ClearScore();
    DrawScore();
    let delay_time = 500;
    if (gameManager.score % 10 == 9)
      smallRect.color = "rgb(255, 229, 51)";
    else
      smallRect.color = "rgb(25, 104, 179)";
    if (gameManager.score % 10 == 0) {
      gameManager.addLevel();
      delay_time = 1000;
      setTimeout("DrawLevel()", delay_time);
    }
    setTimeout("RectRebirth()", delay_time);
  }

  //add new blackball
  bbcount++;
  if (bbcount >= gameManager.maxCount) {
    AddOneEnemy();
    bbcount = 0;
  }

  //remove out blackball
  for (let i = 0; i < enemy.length; i++) {
    enemy[i].Clear();
    enemy[i].Move();
    if(enemy[i].isOut()) {
      enemy.splice(i, 1);
      i--;
    }
  }

  //Draw all elements
  DrawAll();
}

function RectRebirth() {
  smallRect.Restore();
  do{
    smallRect.randomBorn();
  }while(smallRect.row == mBall.row && smallRect.col == mBall.col)
  smallRect.updatePos();
  smallRect.isvalid = true;
}

function GameOver() {
  gameManager.endgame();
  clearInterval(m_timer);
  //draw the gameover window
  DrawOverParam();
}

function ClearData() {
  for (bb of enemy)
    bb.Clear();
  enemy = [];
  mBall.Clear();
  smallRect.Clear();
  smallRect.isvalid = false;
  mBall.row = 1;
  mBall.col = 1;
  mBall.updatePos();
}

function DrawLevel() {
  var pa = document.querySelector("#param");
  var patx = pa.getContext("2d");
  patx.fillStyle = "white";
  patx.textAlign = "center";
  patx.font = "40px Consolas";
  patx.fillText("LEVEL "+gameManager.level, 180, 40);
  setTimeout("ClearParam()", 2000);
}

function GamePause() {
  gameManager.isPaused = true;
  clearInterval(m_timer);

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
  patx.fillText("PAUSE", 180, 150);
  patx.font = "25px Consolas";
  patx.fillText("Press space to continue", 180, 270);
}

function GameContinue() {
  gameManager.isPaused = false;
  ClearParam();
  m_timer = setInterval("Smove()", 10);
}