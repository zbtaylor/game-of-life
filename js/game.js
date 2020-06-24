const stage = document.getElementById("stage");

let y = 0;

// Grid
while (y < 600) {
  let x = 0;

  while (x < 600) {
    const square = document.createElement("div");
    square.className = "square";

    square.addEventListener("click", (event) => {
      event.target.classList.toggle("black");
    });

    stage.appendChild(square);

    x += 20;
  }

  y += 20;
}
