const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;

function draw() {
  // Clear canvas
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "#ff6f61";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x * 20, segment.y * 20, 18, 18);
  });

  // Draw food
  ctx.fillStyle = "#f1c40f";
  ctx.fillRect(food.x * 20, food.y * 20, 18, 18);

  // Move snake
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20),
    };
  } else {
    snake.pop();
  }

  // Collision check
  if (
    head.x < 0 ||
    head.x >= 20 ||
    head.y < 0 ||
    head.y >= 20 ||
    snake.slice(1).some((s) => s.x === head.x && s.y === head.y)
  ) {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
  }
}

function handleKey(e) {
  switch (e.key) {
    case "ArrowUp":
      if (dy === 0) {
        dx = 0;
        dy = -1;
      }
      break;
    case "ArrowDown":
      if (dy === 0) {
        dx = 0;
        dy = 1;
      }
      break;
    case "ArrowLeft":
      if (dx === 0) {
        dx = -1;
        dy = 0;
      }
      break;
    case "ArrowRight":
      if (dx === 0) {
        dx = 1;
        dy = 0;
      }
      break;
  }
}

document.addEventListener("keydown", handleKey);
setInterval(draw, 100);
