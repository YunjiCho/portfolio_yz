var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;
const round = 40;
const heights = 100;
var engine;
var runner;
var world;
var balls1 = [];
var balls2 = [];
var balls3 = [];
var balls4 = [];
var ballSize = 130;
var grounds = [];
var groundCount = 3;
var groundWidth = 30;
var render;

const wordLists = [
  ["나", "나", "다", "라"],
  ["마", "바", "사", "아"],
  ["자", "차", "카", "타"],
  ["파", "하", "가", "나"],
];

let currentWordList = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Matter.Engine.create();
  runner = Matter.Runner.create();
  world = engine.world;

  render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: width,
      height: height,
      wireframes: false, // 와이어프레임 모드 해제
      background: "white", // 배경을 흰색으로 설정
      pixelRatio: 0.1, // 이 부분에서 pixelRatio 값을 설정
    },
  });

  Matter.Runner.run(runner, engine);

  var options = {
    isStatic: true,
    render: {
      fillStyle: "black", // 검정색으로 설정
    },
  };

  land = Bodies.rectangle(width / 2, height + 50, width, 100, options);
  leftGround = Bodies.rectangle(
    0,
    height - height / 2,
    20,
    windowHeight,
    options
  );
  rightGround = Bodies.rectangle(
    width,
    height - height / 2,
    20,
    windowHeight,
    options
  );
  World.add(world, [rightGround, leftGround, land]);
  for (var i = 0; i < groundCount; i++) {
    var x = ((i + 1) * width) / (groundCount + 1);
    grounds.push(
      Bodies.rectangle(
        x,
        height - height / 2,
        groundWidth,
        windowHeight,
        options
      )
    );
    World.add(world, grounds[i]);
  }

  currentWordList = wordLists[0]; // 초기에 첫 번째 리스트를 선택
}

function draw() {
  background(255);
  fill(255);

  for (var i = 0; i < balls1.length; i++) {
    balls1[i].show();
  }
  for (var i = 0; i < balls2.length; i++) {
    balls2[i].show();
  }
  for (var i = 0; i < balls3.length; i++) {
    balls3[i].show();
  }
  for (var i = 0; i < balls4.length; i++) {
    balls4[i].show();
  }
  buttonbg();
  button1 = button(0, 0 + 5, "조윤지");
  button(width / 4, 0 + 5, "Graphic");
  button((width / 4) * 2, 0 + 5, "Interaction");
  button((width / 4) * 3, 0 + 5, "UX");
}
function mousePressed() {
  if (mouseY > 0 && mouseY < 100) {
    if (mouseX > 0 && mouseX < width / 4) {
      currentWordList = wordLists[0];
      var ball = new Ball(
        random(0, width / 4),
        0,
        ballSize,
        ballSize,
        random(currentWordList)
      );
      // 속도를 더 큰 값으로 설정 (x 방향은 0, y 방향은 10)
      balls1.push(ball);
    } else if (mouseX > width / 4 && mouseX < width / 2) {
      currentWordList = wordLists[1];
      var ball = new Ball(
        random(width / 4, width / 2),
        0,
        ballSize,
        ballSize,
        random(currentWordList)
      );
      balls2.push(ball);
    } else if (mouseX > width / 2 && mouseX < (width / 4) * 3) {
      currentWordList = wordLists[2];
      var ball = new Ball(
        random(width / 2, (width / 4) * 3),
        0,
        ballSize,
        ballSize,
        random(currentWordList)
      );
      balls3.push(ball);
    } else {
      currentWordList = wordLists[3];
      var ball = new Ball(
        random((width / 4) * 3, width),
        0,
        ballSize,
        ballSize,
        random(currentWordList)
      );
      balls4.push(ball);
    }

    // 10초 후에 ball을 잠들게 설정
    setTimeout(() => {
      Matter.Sleeping.set(ball.body, true);
    }, 10000);
  }
  Matter.Body.setVelocity(ball.body, { x: 0, y: 10 });
}

function buttonbg() {
  fill(255);
  rect(0, 0 - heights / 2, width / 4, heights);
  rect(width / 4, 0 - heights / 2, width / 4, heights);
  rect((width / 4) * 2, 0 - heights / 2, width / 4, heights);
  rect((width / 4) * 3, 0 - heights / 2, width / 4, heights);
}
