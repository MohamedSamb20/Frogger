/* global p5 */
/*
1. Add multiple cars. (COMPLETE)
2. Add a certain goal - i.e. score 5 times to end the game.
3. Make it so that you can only move the frog if the game is not over. (COMPLETE)
4. Make the game get more and more challenging as you win more and more times.
5. Color code your player pieces. (COMPLETE)
6. Using some ideas from yesterday’s game, add some collectible power-ups that make you temporarily invincible, faster, smaller, or rainbow-colored.
7. Add features like a river to the background - make some additional modifications to the gameplay - perhaps falling into the river also sends you back. Add logs that float.
*/
// DO NOT DELETE THIS LINE
const p = new p5(() => {});

let grassColor, frogX, frogY, score, lives, gameIsOver, cars;

p.setup = function () {
  // Canvas & color settings
  p.createCanvas(500, 500);
  p.colorMode(p.HSB, 360, 100, 100);
  grassColor = p.color(100, 100, 100);
  frogX = p.random(p.width);
  frogY = p.random(p.height);
  score = 0;
  lives = 3;
  gameIsOver = false;
  cars = [{"X": 0, "Y": 100, "V": 5},{"X": 100, "Y": 250, "V": 3}, {"X": 400, "Y": 400, "V": 1}];
}

p.draw = function () {
  p.background(0);
  p.fill(grassColor);
  p.rect(0, 150, p.width, 50);
  p.rect(0, 300, p.width, 50);
  p.rect(0, 450, p.width, 50);
  // Code for gold goal line
  p.fill(60, 80, 80);
  p.rect(0, 0, p.width, 50);
  // Code to display Frog
  p.fill(200, 80, 80);
  p.ellipse(frogX, frogY, 20);
  for(var i=0;i<cars.length;i++){
    moveCars(i);
    drawCars(i);
    checkCollisions(i);
  }
  checkWin();
  displayScores();
}

function keyPressed() {
  if (p.keyCode === p.UP_ARROW) {
    frogY -= 10;
  }
  if (p.keyCode === p.DOWN_ARROW) {
    frogY += 10;
  }
}

function moveCars(a) {
  // Move the car
  cars[a].X+=cars[a].V;
  // Reset if it moves off screen
  if(cars[a].X > p.width){
    cars[a].X = 0;
  }
}

function drawCars(a) {
  // Code for car 1
  p.fill(0, 80, 80);
  p.rect(cars[a].X, cars[a].Y, 40, 30);
  // Code for additional cars
}

function checkCollisions(a) {
  // If the frog collides with the car, reset the frog and subtract a life.
  let collision = p.collideRectCircle(cars[a].X, cars[a].Y, 40, 30, frogX, frogY, 20);
  if(collision){
    lives--;
    resetFrog();
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  let winCollision = p.collideRectCircle(0, 0, p.width, 50, frogX, frogY, 20);
  if(winCollision){
    score+=5;
    resetFrog();
  }
}

function displayScores() {
  p.textSize(12);
  p.fill(0);
  // Display Lives
  p.text(`Lives: ${lives}\nScore: ${score}`, 10, 20);
  // Display Score
  // Display game over message if the game is over
  if(lives == 0){
    alert("Game over! Try again");
    lives = 3;
    score=0;
  }
}
function resetFrog(){
    frogX = p.random(p.width);
    frogY = p.height - 15;
  }
