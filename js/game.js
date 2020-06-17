const stage = new createjs.Stage("canvas");
const square = new createjs.Shape();
square.graphics.beginFill("black").drawRect(290, 290, 10, 10);
stage.addChild(square);
stage.update();
