// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 1200;
canvas.height = 600;

// Ball properties
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 7; // Ball speed
let dy = -7; // Ball speed
let ballColor = "pink"; // Initial color

// Paddle properties
const paddleHeight = 10;
const paddleWidth = 150; // Increased paddle width for a longer paddle
let paddleX = (canvas.width - paddleWidth) / 2;
const paddleSpeed = 15; // Increased speed

// Color array for ball
const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];
let currentColorIndex = 0;

// Control variables
let rightPressed = false;
let leftPressed = false;

// Game state variables
let isGameOver = false;
let isGameStarted = false; // New variable to track if the game has started

// Event listeners for paddle control
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Event listener for the Start button
canvas.addEventListener("click", startGameHandler);

// Event listener for the Play Again button
canvas.addEventListener("click", playAgainHandler);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor; // Use current ball color
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawGameOver() {
    ctx.font = "40px monospace";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
}

function drawPlayAgain() {
    ctx.font = "20px Tahoma";
    ctx.fillStyle = "lightgreen";
    ctx.fillText("Play Again", canvas.width / 2, canvas.height / 2 + 50);
}

function drawStartPrompt() {
    ctx.font = "40px monospace";
    ctx.fillStyle = "lightgreen";
    ctx.textAlign = "center";
    ctx.fillText("Start", canvas.width / 2, canvas.height / 2);
}

// Handle Start Game click
function startGameHandler(e) {
    if (!isGameStarted) {
        isGameStarted = true;
        draw(); // Start the game loop
    }
}

// Handle Play Again click
function playAgainHandler(e) {
    if (isGameOver) {
        isGameOver = false;
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 7;
        dy = -7;
        paddleX = (canvas.width - paddleWidth) / 2;
        ballColor = colors[currentColorIndex]; // Reset ball color
        draw(); // Restart the game loop
    }
}

function changeBallColor() {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    ballColor = colors[currentColorIndex];
}

function draw() {
    if (!isGameStarted) {
        drawStartPrompt();
        return;
    }

    if (isGameOver) {
        drawGameOver();
        drawPlayAgain();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            changeBallColor(); // Change ball color on paddle hit
        } else {
            isGameOver = true;
        }
    }

    x += dx;
    y += dy;

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
    }

    requestAnimationFrame(draw);
}

draw();
