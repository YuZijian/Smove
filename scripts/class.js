function whiteBall(r, c) {
  var wb_obj = {
    row: r,
    col: c,
    posX: 120,
    posY: 120,
    r: 24,

    Move: function(dir) {
      switch (dir) {
        case 0: //left
          if (this.col == 1 || this.col == 2) {
            this.col--;
            this.Clear();
            this.updatePos();
          }
          break;
        case 1: //up
          if (this.row == 1 || this.row == 2) {
            this.row--;
            this.Clear();
            this.updatePos();
          }
          break;
        case 2: //right
          if (this.col == 0 || this.col == 1) {
            this.col++;
            this.Clear();
            this.updatePos();
          }
          break;
        case 3: //down
          if (this.row == 0 || this.row == 1) {
            this.row++;
            this.Clear();
            this.updatePos();
          }
          break;
        default:
          break;
      }
    },

    updatePos: function() {
      this.posX = 45 + 75 * this.col;
      this.posY = 45 + 75 * this.row;
    },

    Draw: function() {
      var wb = document.querySelector("#whiteb");
      var wbtx = wb.getContext("2d");
      wbtx.fillStyle = "white";
      wbtx.globalAlpha = 1;
      wbtx.beginPath();
      wbtx.arc(this.posX, this.posY, this.r, 0, 2*Math.PI);
      wbtx.closePath();
      wbtx.fill();
    },

    Clear: function() {
      var wb = document.querySelector("#whiteb");
      var wbtx = wb.getContext("2d");
      wbtx.clearRect(this.posX-this.r, this.posY-this.r, 2*this.r, 2*this.r);
    }
  }
  return wb_obj;
}

function blackBall(roc, s, dir) {
  var bb_obj = {
    row: roc,
    col: roc,
    posX: 0,
    posY: 0,
    speed: s,
    r: 28,
    dir: dir,

    Init: function() {
      switch (this.dir) {
        case 0: //left->right
          this.posY = 225 + 75 * this.row;
          this.posX = -this.r;
          break;
        case 1: //up->bottom
          this.posX = 225 + 75 * this.col;
          this.posY = -this.r;
          break;
        case 2: //right->left
          this.posY = 225 + 75 * this.row;
          this.posX = 600 + this.r;
          break;
        case 3: //bottom->up
          this.posX = 225 + 75 * this.col;
          this.posY = 600 + this.r;
          break;
        case 4: // lefttop->rightbottom
          this.posX = -this.r + (this.row - 1) * 75;
          this.posY = -this.r;
          break;
        case 5: // leftbottom->righttop
          this.posX = -this.r + (this.row - 1) * 75;
          this.posY = 600 + this.r;
          break;
        case 6: // righttop->leftbottom
          this.posX = 600 + this.r + (this.row - 1) * 75;
          this.posY = -this.r;
          break;
        case 7: // rightbottom->lefttop
          this.posX = 600 + this.r + (this.row - 1) * 75;
          this.posY = 600 + this.r;
          break;
        default:
          break;
      }
    },

    Adjust: function() {
      switch (dir) {
        case 4: // lefttop->rightbottom
          this.posX -= this.r;
          this.posY -= this.r;
          break;
        case 5: // leftbottom->righttop
          this.posX -= this.r;
          this.posY += this.r;
          break;
        case 6: // righttop->leftbottom
          this.posX += this.r;
          this.posY -= this.r;
          break;
        case 7: // rightbottom->lefttop
          this.posX += this.r;
          this.posY += this.r;
          break;
        default:
          break;
      }
    },

    Move: function() {
      switch (dir) {
        case 0: //left->right
          this.posX += this.speed;
          break;
        case 1: //up->bottom
          this.posY += this.speed;
          break;
        case 2: //right->left
          this.posX -= this.speed;
          break;
        case 3: //bottom->up
          this.posY -= this.speed;
          break;
        case 4: // lefttop->rightbottom
          this.posX += this.speed;
          this.posY += this.speed;
          break;
        case 5: // leftbottom->righttop
          this.posX += this.speed;
          this.posY -= this.speed;
          break;
        case 6: // righttop->leftbottom
          this.posX -= this.speed;
          this.posY += this.speed;
          break;
        case 7: // rightbottom->lefttop
          this.posX -= this.speed;
          this.posY -= this.speed;
          break;
        default:
          break;
      }
    },

    Draw: function() {
      var bb = document.querySelector("#blackb");
      var bbtx = bb.getContext("2d");
      bbtx.fillStyle = "black";
      bbtx.globalAlpha = 1;
      bbtx.beginPath();
      bbtx.arc(this.posX, this.posY, this.r, 0, 2*Math.PI);
      bbtx.closePath();
      bbtx.fill();
    },

    Clear: function() {
      var bb = document.querySelector("#blackb");
      var bbtx = bb.getContext("2d");
      bbtx.clearRect(this.posX-this.r, this.posY-this.r, 2*this.r, 2*this.r);
    },

    isOut: function() {
      switch (dir) {
        case 0: //left->right
          return this.posX >= 650;
        case 1: //up->bottom
          return this.posY >= 650;
        case 2: //right->left
          return this.posX <= -50;
        case 3: //bottom->up
          return this.posY <= -50;
        default:
          return false;
      }
    }
  }

  return bb_obj;
}

// small blue rect to eat
function food() {
  var fd_obj = {
    row: 0,
    col: 0,
    halfsize: 12,
    halflength: 17,
    isvalid: false,
    color: "rgb(25, 104, 179)",
    deg_count: 0,
    rotate_deg: Math.PI / 100,

    randomBorn: function() {
      let randnum = rand(0, 8);
      this.row = Math.floor(randnum/3);
      this.col = randnum % 3;
    },

    updatePos: function() {
      var fd = document.querySelector("#smallrec");
      let leftmg = 208 + 75 * this.col;
      let topmg = 208 + 75 * this.row;
      fd.style.left = leftmg + 'px';
      fd.style.top = topmg + 'px';
    },

    Draw: function() {
      this.Clear();
      var fd = document.querySelector("#smallrec");
      var fdtx = fd.getContext("2d");
      //Rotate
      fdtx.translate(this.halflength, this.halflength);
      fdtx.rotate(this.rotate_deg);
      this.deg_count++;
      if (this.deg_count == 100)
        this.deg_count = 0;
      fdtx.translate(-this.halflength, -this.halflength);

      fdtx.globalAlpha = 1;
      fdtx.fillStyle = this.color;
      fdtx.fillRect(this.halflength-this.halfsize, this.halflength-this.halfsize, 2*this.halfsize, 2*this.halfsize);
    },

    Clear: function() {
      var fd = document.querySelector("#smallrec");
      var fdtx = fd.getContext("2d");
      fdtx.clearRect(0, 0, 2*this.halflength, 2*this.halflength);
    },

    Restore: function() {
      var fd = document.querySelector("#smallrec");
      var fdtx = fd.getContext("2d");
      fdtx.translate(this.halflength, this.halflength);
      fdtx.rotate(-this.deg_count * this.rotate_deg);
      this.deg_count = 0;
      fdtx.translate(-this.halflength, -this.halflength);
    }
  }
  return fd_obj;
}

function smoveManager() {
  var manager = {
    status: 0, //gamestatus 0 ready 1 start 2 over
    level: 0,
    score: 0,
    best: 0,
    isPaused: false,
    bbsead: 0, //random sead for blackBall
    maxCount: 300,

    Status: function() {
      return this.status;
    },

    startgame: function() {
      this.status = 1;
      this.score = 0;
      this.level = 1;
      this.isPaused = false;
      this.bbsead = rand(0, 3);
      this.maxCount = 200;
    },

    addScore: function() {
      this.score++;
    },

    addLevel: function() {
      this.level++;
      switch (this.level) {
        case 0:
        case 1:
        case 2:
          this.maxCount = 200;
          break;
        case 3:
          this.maxCount = 180;
          break;
        case 4:
          this.maxCount = 120;
          break;
        case 5:
          this.maxCount = 180;
          break;
        default:
          this.maxCount = 80;
          break;
      }
      this.bbsead = rand(0, 3);
    },

    updateBest: function() {
      if (this.best < this.score) {
        this.best = this.score;
      }
    },

    endgame: function() {
      this.status = 2;
      this.updateBest();
    }
  }
  return manager;
}

var mBall = whiteBall(1, 1);
var smallRect = food();
var gameManager = smoveManager();
var enemy = [];


function AddOneEnemy() {
  var roc, speed, bb;
  switch (gameManager.level) {
    case 1:
      roc = rand(0, 2);
      speed = 2;
      let onebb = blackBall(roc, speed, gameManager.bbsead);
      onebb.Init();
      enemy.push(onebb);
      gameManager.bbsead = rand(0, 3);
      break;

    case 2:
      roc = rand(0, 2);
      speed = 2;
      let type = rand(0, 1);
      //type1
      if (type == 0) {
        bb = [];
        bb[0] = blackBall(0, speed, 0);
        bb[1] = blackBall(2, speed, 2);
        bb[2] = blackBall(0, speed, 3);
        bb[3] = blackBall(2, speed, 1);
        for (let onebb of bb){
          onebb.Init();
          enemy.push(onebb);
        }
        gameManager.bbsead = rand(0, 3);
        break;
      }
      //type2
      bb = [];
      let sead2 = (gameManager.bbsead + 2) % 4;
      bb[0] = blackBall(roc, speed, gameManager.bbsead);
      bb[1] = blackBall(2-roc, speed, sead2);
      for (let onebb of bb){
        onebb.Init();
        enemy.push(onebb);
      }
      gameManager.bbsead = rand(0, 3);
      break;

    case 3:
      roc = rand(0, 1);
      let roc2 = roc + 1;
      speed = 2;
      let speed2 = 3;
      bb = [];
      bb[0] = blackBall(roc, speed, gameManager.bbsead);
      bb[1] = blackBall(roc2, speed2, gameManager.bbsead);
      for (let onebb of bb){
        onebb.Init();
        enemy.push(onebb);
      }
      gameManager.bbsead = (gameManager.bbsead + 1) % 4;
      break;

    case 4:
      speed = 3;
      roc = rand(0, 1);
      bb = [];
      bb[0] = blackBall(roc, speed, gameManager.bbsead);
      bb[1] = blackBall(roc+1, speed, gameManager.bbsead);
      for (let onebb of bb){
        onebb.Init();
        enemy.push(onebb);
      }
      gameManager.bbsead = rand(0, 3);
      break;

    case 5:
      speed = 3;
      gameManager.bbsead = rand(4, 7);
      bb = [];
      bb[0] = blackBall(1, speed, gameManager.bbsead);
      bb[1] = blackBall(1, speed, gameManager.bbsead);
      bb[0].Init();
      bb[1].Init();
      bb[1].Adjust();
      enemy.push(bb[0]);
      enemy.push(bb[1]);
      break;

    case 6:
      roc = rand(0, 2);
      speed = 3;
      gameManager.bbsead = rand(0, 7);
      bb = [];
      bb[0] = blackBall(roc, speed, gameManager.bbsead);
      bb[0].Init();
      enemy.push(bb[0]);
      break;

    default:
      bb = [];
      bb[0] = blackBall(rand(0, 3), rand(2, 4), rand(0, 7));
      bb[1] = blackBall(rand(0, 3), rand(2, 4), rand(0, 7));
      for (let onebb of bb){
        onebb.Init();
        enemy.push(onebb);
      }
      break;
  }
}

function rand(min, max) {
  let range = max - min;
  let randnum = min + Math.round(Math.random() * range);
  return randnum;
}