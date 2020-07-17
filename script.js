const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let score=0;
const restartGame = document.getElementById("restart-button")
restartGame.addEventListener('click', () => location.reload())

let isOver=false;
const startGame = document.getElementById("start-button")
startGame.addEventListener('click', () => location.reload())

function drawBackGround(){
    ctx.fillStyle = "green";
    ctx.fillRect(0,0,600,600);
    ctx.fillStyle = "black";
    ctx.font = "25px roman"
    ctx.fillText(`Score: ${score}`, 500, 50);
}
function drawBall(ball) {
    ctx.beginPath();
    ball.y += 4
    if (score>5) ball.y+=6;
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.stroke();
    if (ball.y > 600 ) {
    gameOver();
  }
}
const basket = {
    image: new Image(),
    height: 60,
    width: 80,
    x: 520,
    y: canvas.height - 90,
  };
basket.image.src = "./images/basket.png";
let ball = {
    x: 50,
    y: 50,
    r: 18,
    color: 'red'
};
const gameOver = () =>{
    isOver=true;
    if (isOver) {
        restartGame.style.display = "block"
    }
    ctx.font = '50px bold Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Game over',  200, 200);
    clearInterval(interval)
 }
function draw() {
    ctx.clearRect(0, 0 , canvas.width, canvas.height)
    startGame.style.display = "block"
    if ( ball.y>600){
        ball.x = Math.floor(Math.random() * 600);
        ball.y=0 
        } 
    drawBackGround() ;
    drawBall(ball);
    if (ballBasketColliding(ball,basket)) {
    score ++;
    ball.y=0;
    ball.x = Math.floor(Math.random() * 600);
    }
    ctx.drawImage(basket.image, basket.x, basket.y, 80, 60);
}

let interval = setInterval(draw, 30)


//add left and right movement
document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 37:
      if (basket.x > 0) basket.x -= 10;
      break;
    case 39:
      if (basket.x <= 520) basket.x += 10;
      break;

    default:
      console.log("No movement");
  }
});


// return true if the rectangle and circle are colliding
function ballBasketColliding(ball,basket){
    var distX = Math.abs(ball.x - basket.x-basket.width/2);
    var distY = Math.abs(ball.y - basket.y-basket.height/2);

    if (distX > (basket.width/2 + ball.r)) { return false; }
    if (distY > (basket.height/2 + ball.r)) { return false; }

    if (distX <= (basket.width/2)) { return true; } 
    if (distY <= (basket.height/2)) { return true; }

    var dx=distX-basket.width/2;
    var dy=distY-basket.height/2;
    return (dx*dx+dy*dy<=(ball.r*ball.r));
}

