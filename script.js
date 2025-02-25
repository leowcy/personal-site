// Particles
const particleDiv = document.querySelector(".particles");
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particleDiv.appendChild(particle);
  resetParticle(particle);
}

function resetParticle(particle) {
  const size = Math.random() * 5 + 2;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.background = `rgba(${Math.random() * 255}, ${
    Math.random() * 255
  }, 255, 0.7)`;
  particle.style.left = `${Math.random() * 100}vw`;
  particle.style.top = `${Math.random() * 100}vh`;
  particle.style.animation = `float ${Math.random() * 5 + 3}s infinite`;
}

document.querySelectorAll(".particle").forEach((p) => {
  p.addEventListener("animationiteration", () => resetParticle(p));
});

// Snake game (unchanged below)
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff6f61";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x * 20, segment.y * 20, 18, 18);
  });

  ctx.fillStyle = "#f1c40f";
  ctx.fillRect(food.x * 20, food.y * 20, 18, 18);

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = score;
    food = {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20),
    };
  } else {
    snake.pop();
  }

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
    scoreDisplay.textContent = score;
  }

  setTimeout(draw, 100);
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
draw();
