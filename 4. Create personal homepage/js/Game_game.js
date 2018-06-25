var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// 공의 크기 설정
var ballRadius = 10;

// 공의 위치를 저장하는 변수
var x = canvas.width/2;
var y = canvas.height-30;

// 공의 점진적인 이동을 위한 변수
var dx = 2;
var dy = -2;

// 패들의 크기와 위치 설정
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

// 방향기를 눌렀을 때 패들을 움직이기 위한 초기 설정 
var rightPressed = false;
var leftPressed = false;

// 벽돌에 대한 정보 
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// 점수를 저장하는 변수 
var score = 0;

// 공을 놓칠 수 있는 목숨 
var lives = 3;

// 벽돌 생성을 위한 배열 생성 
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// 방향기를 눌렀을 때 패들을 움직이기 위한 리스너 
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// 키를 눌렀을 시 작동하는 함수
// 키 번호를 확인하고 <- or -> 방향키가 눌린 경우 Pressed 이벤트를 true로
function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
}
// 키가 눌리지 않았을 시 작동하는 함수
// 키 번호를 확인하고 <- or -> 방향키가 동작이 취소된 경우 Pressed 이벤트를 다시 false로
function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  else if(e.keyCode == 37) {
    leftPressed = false;
  }
}
// 공이 벽돌과 충동했는지 감지하는 함수 
function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      // 벽돌이 있는 경우 status=1 공과 충돌이 발생할 경우 status=0
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          // 벽돌과 공의 충돌 감지 시 점수 증가 
          score++;
          // 모든 포인트를 수집했을 경우 승리 메시지 출력 
          if(score == brickRowCount*brickColumnCount) {
            alert("YOU WIN, CONGRATS~~! >_<");
            document.location.reload();
          }
        }
      }
    }
  }
}

// 공을 그리는 함수
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();
}

// 공을 튀겨주는 패달을 그리는 함수
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0000FF";
  ctx.fill();
  ctx.closePath();
}

// 벽돌을 그려주는 함수
function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#8A4B08";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
// 점수판을 생성하는 함수 
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
}
// 목숨칸을 생성하는 함수 
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

// 캔버스를 계속 다시 그려주면서 프레임의 이동 흔적을 제거해주는 함수
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  // 공이 canvas의 좌, 우에 부딪히면 반대로 튕기도록 설정
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  // 공이 canvas의 상단에 부딪히면 아래로 튕기도록 설정
  if(y + dy < ballRadius) {
    dy = -dy;
  }
  // 공이 하단에 부딪히면 게임 오버 메시지를 출력
  else if(y + dy > canvas.height-ballRadius) {
    // 공이 패들에 부딪히면 튕겨나오도록 설정
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      lives--;
      // 목숨이 없을 경우 게임 오버 
      if(!lives) {
        alert("GAME OVER....U_U");
        document.location.reload();
      }
      // 목숨이 남은 경우 공과 패들의 위치 재설정 
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }

// -> 방향키가 눌린 경우 패들 위치를 오른쪽으로 7 만큼 이동
// 단, 패들이 canvas를 벗어나지 않는 범위 내에서
if(rightPressed && paddleX < canvas.width-paddleWidth) {
   paddleX += 7;
}
// <- 방향키가 눌린 경우 패들 위치를 왼쪽으로 7 만큼 이동
// 단, 패들이 canvas를 벗어나지 않는 범위 내에서
else if(leftPressed && paddleX > 0) {
   paddleX -= 7;
}

// 공의 이동을 위한 연산
x += dx;
y += dy;
requestAnimationFrame(draw);
}

draw();