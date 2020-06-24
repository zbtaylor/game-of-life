const stage = new createjs.Stage("canvas");

let y = 0;

// Grid
while (y < 600) {
  let x = 0;

  while (x < 600) {
    const square = new createjs.Shape();
    square.graphics.setStrokeStyle(0.25).beginStroke("black");
    square.graphics.drawRect(x, y, 20, 20);
    square.graphics.endStroke();
    stage.addChild(square);

    square.on("click", (event) => {
      console.log(event.target.graphics);
      event.target.graphics.beginFill("black").endFill();
      stage.addChild(event.target);
      stage.update();
    });
    x += 20;
  }

  y += 20;
}

stage.update();
