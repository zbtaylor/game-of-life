const stage = document.getElementById("stage");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const counter = document.getElementById("counter");
const numbers = document.getElementById("numbers");
const rowLength = 30;
const total = rowLength * rowLength;
let currentBuffer = [];
let nextBuffer = [];
let count = 0;
let game = undefined;
let paused = false;

const createEmptyCells = () => {
  currentBuffer = [];
  stage.innerHTML = "";

  for (let i = 0; i < total; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";

    cell.addEventListener("click", (event) => {
      event.target.classList.toggle("alive");
    });

    cell.innerHTML = i;

    stage.appendChild(cell);
    currentBuffer.push(cell);
  }
};

const modify = (buffer) => {
  const toToggle = [];

  buffer.forEach((c, i) => {
    const neighbors = checkNeighbors(i);
    if (isAlive(i)) {
      // Cell dies if it doesn't have 2 or 3 living neighbors
      if (neighbors !== 2 && neighbors !== 3) {
        toToggle.push(i);
      }
    } else {
      // Cell comes to life if it has 3 living neighbors
      if (neighbors === 3) {
        toToggle.push(i);
      }
    }
  });

  toToggle.forEach((i) => {
    nextBuffer[i].classList.toggle("alive");
  });
};

const isAlive = (i) => {
  if (0 < i && i < nextBuffer.length - 1) {
    return nextBuffer[i].classList.contains("alive");
  } else {
    return false;
  }
};

const checkNeighbors = (i) => {
  let alive = 0;

  // Left neighbor
  if (isAlive(i - 1)) {
    alive++;
  }

  // Right neighbor
  if (isAlive(i + 1)) {
    alive++;
  }

  // Top neighbor
  if (isAlive(i - rowLength)) {
    alive++;
  }

  // Bottom neighbor
  if (isAlive(i + rowLength)) {
    alive++;
  }

  // Top left neighbor
  if (isAlive(i - rowLength - 1)) {
    alive++;
  }

  // Top right neighbor
  if (isAlive(i - rowLength + 1)) {
    alive++;
  }

  // Bottom left neighbor
  if (isAlive(i + rowLength - 1)) {
    alive++;
  }

  // Bottom right neighbor
  if (isAlive(i + rowLength + 1)) {
    alive++;
  }

  return alive;
};

const startGame = () => {
  stage.classList.add("playing");
  if (game !== undefined) {
    paused = false;
  } else {
    game = window.setInterval(() => {
      if (!paused) {
        // Copy current buffer
        nextBuffer = Array.from(currentBuffer);
        // Modify new buffer
        modify(nextBuffer);
        // Replace current buffer with new buffer
        stage.innerHTML = "";
        nextBuffer.forEach((cell) => {
          stage.append(cell);
        });
        currentBuffer = nextBuffer;
        // Update count
        count += 1;
        counter.innerHTML = count;
      }
    }, 1000);
  }
};

const stopGame = () => {
  stage.classList.remove("playing");
  paused = true;
};

const resetGame = () => {
  stage.classList.remove("playing");
  window.clearInterval(game);
  game = undefined;
  count = 0;
  counter.innerHTML = count;
  createEmptyCells();
};

const toggleNumbers = () => {
  stage.classList.toggle("visible-text");
  if (numbers.innerHTML === "Show Numbers") {
    numbers.innerHTML = "Hide Numbers";
  } else {
    numbers.innerHTML = "Show Numbers";
  }
};

// Controls
start.addEventListener("click", () => startGame());
stop.addEventListener("click", () => stopGame());
reset.addEventListener("click", () => resetGame());
numbers.addEventListener("click", () => toggleNumbers());

// Initial state
createEmptyCells();
