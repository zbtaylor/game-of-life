const stage = new createjs.Stage("canvas");

let i = 20;

// Grid
while (i <= 600) {
  const lineY = new createjs.Shape();
  const lineX = new createjs.Shape();

  stage.addChild(lineY);
  lineY.graphics.setStrokeStyle(0.5).beginStroke("black");
  lineY.graphics.moveTo(0, i);
  lineY.graphics.lineTo(600, i);
  lineY.graphics.endStroke();

  stage.addChild(lineX);
  lineX.graphics.setStrokeStyle(0.5).beginStroke("black");
  lineX.graphics.moveTo(i, 0);
  lineX.graphics.lineTo(i, 600);
  lineX.graphics.endStroke();

  i += 20;
}

stage.update();
