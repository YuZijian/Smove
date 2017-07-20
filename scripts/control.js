document.onkeydown = function(event) {
  var e =  event || window.event || arguments.callee.caller.arguments[0];
  if (e && e.keyCode) {
    if (gameManager.Status() == 0){
      gameManager.startgame();
      if(e.keyCode >= 37 && e.keyCode <= 40)
        mBall.Move(e.keyCode % 37);
      GameBegin();
    }
    else if (gameManager.Status() == 1) {
      if(gameManager.isPaused == false && e.keyCode >= 37 && e.keyCode <= 40)
        mBall.Move(e.keyCode % 37); //37->left->Move(0)
      else if (e.keyCode == 32) {
        if(gameManager.isPaused)
          GameContinue();
        else
          GamePause();
      }
    }
    else if (gameManager.Status() == 2) {
      if (e.keyCode == 13) {  //Enter
        ClearData();
        gameManager.startgame();
        GameBegin();
      }
    }
  }
}

//mobile touch
var startX, startY, endX, endY, dx, dy, dir;

var mybody = document.querySelector("#smove");
var h = document.documentElement.clientHeight;
mybody.style.height = h + 'px';

mybody.addEventListener('touchstart', function(e) {
    if (e.cancelable) {
      if (!e.defaultPrevented)
        e.preventDefault();
    }
    if (gameManager.Status() == 0) {
      gameManager.startgame();
      GameBegin();
    }
    else if (gameManager.Status() == 2) {
      ClearData();
      gameManager.startgame();
      GameBegin();
    }
    else if (gameManager.Status() == 1) {
      startX = e.touches[0].pageX;
      startY = e.touches[0].pageY;
    }
  });

mybody.addEventListener('touchend', function(e){
  if (e.cancelable) {
    if (!e.defaultPrevented)
      e.preventDefault();
  }
  if (gameManager.Status() == 1) {
    endX = e.changedTouches[0].pageX;
    endY = e.changedTouches[0].pageY;
    dx = endX - startX;
    dy = endY - startY;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx < -20)
        dir = 0;
      else if (dx > 20)
        dir = 2;
    }
    else {
      if (dy < -20)
        dir = 1;
      else if (dy > 20)
        dir = 3;
    }
    mBall.Move(dir);
  }
});
