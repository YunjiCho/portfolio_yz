var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;
const round = 50;
const heights = 100;
var engine;
var runner;
var world;
var balls1 = [];
var balls2 = [];
var balls3 = [];
var balls4 = [];
var ballSize = 140;
var grounds = [];
var groundCount = 3;
var groundWidth = 30;
var render;
var bg1 = 307;
var bg2 = 38;
var bg3 = 240;
var bg4 = 96;
let currentWordIndex = 0;
const wordLists = [
  ["조", "윤", "지"],
  ["마", "바", "사", "아"],
  ["자", "차", "카", "타"],
  ["파", "하", "가", "나"],
];
let wordsUsed = [0, 0, 0, 0];
let currentWordList = [];
let buttonColors = []; // 버튼 색상 배열
let hoverColors = []; // 버튼 호버 색상 배열

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
  colorMode(HSB, 360, 100, 100);
  buttonColors = [
    color(bg1, 100, 100),
    color(bg2, 100, 100),
    color(bg3, 100, 100),
    color(bg4, 100, 100),
  ];

  hoverColors = [
    color(bg4 + 30, 100, 100),
    color(bg3 + 30, 100, 100),
    color(bg2 + 30, 100, 100),
    color(bg1 + 30, 100, 100),
  ];
  textColors = [
    color(bg4 + 30, 0, 100),
    color(bg3 + 30, 0, 100),
    color(bg2 + 30, 0, 100),
    color(bg1 + 30, 0, 100),
  ];
  hovertextColors = [
    color(bg1, 100, 100),
    color(bg2, 100, 100),
    color(bg3, 100, 100),
    color(bg4, 100, 100),
  ];
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
  for (let i = 0; i < 4; i++) {
    let buttonX = (i * width) / 4;
    let buttonY = -5;
    let buttonText = "";

    if (i === 0) {
      buttonText = "조윤지";
    } else if (i === 1) {
      buttonText = "Graphic";
    } else if (i === 2) {
      buttonText = "Interaction";
    } else if (i === 3) {
      buttonText = "UX";
    }

    let isClicked =
      mouseX > buttonX &&
      mouseX < buttonX + width / 4 &&
      mouseY > buttonY &&
      mouseY < buttonY + heights;

    let buttonColor = isClicked ? hoverColors[i] : buttonColors[i];
    let textColor = isClicked ? hovertextColors[i] : textColors[i];
    button(buttonX, buttonY + 5, buttonText, buttonColor, textColor);
  }
}

function mousePressed() {
  for (let i = 0; i < 4; i++) {
    let buttonX = (i * width) / 4;
    let buttonY = -5;
    let buttonWidth = width / 4;
    let buttonHeight = heights;

    if (
      mouseX > buttonX &&
      mouseX < buttonX + buttonWidth &&
      mouseY > buttonY &&
      mouseY < buttonY + buttonHeight
    ) {
      handleButtonClick(i);
    }
  }
}

function handleButtonClick(buttonIndex) {
  if (wordsUsed[buttonIndex] < wordLists[buttonIndex].length) {
    currentWordList = wordLists[buttonIndex];
    let wordCount = currentWordList.length;
    let buttonColor;

    if (buttonIndex === 0) {
      buttonColor = color(bg1, 100, 100);
    } else if (buttonIndex === 1) {
      buttonColor = color(bg2, 100, 100);
    } else if (buttonIndex === 2) {
      buttonColor = color(bg3, 100, 100);
    } else if (buttonIndex === 3) {
      buttonColor = color(bg4, 100, 100);
    }

    let word = currentWordList[wordsUsed[buttonIndex]]; // 다음 사용되지 않은 워드

    if (word) {
      let ball = new Ball(
        random((buttonIndex * width) / 4, ((buttonIndex + 1) * width) / 4),
        0,
        ballSize,
        ballSize,
        word,
        buttonColor
      );

      if (wordCount > 0) {
        if (buttonIndex === 0) {
          balls1.push(ball);
        } else if (buttonIndex === 1) {
          balls2.push(ball);
        } else if (buttonIndex === 2) {
          balls3.push(ball);
        } else if (buttonIndex === 3) {
          balls4.push(ball);
        }
      }

      setTimeout(() => {
        Matter.Sleeping.set(ball.body, true);
      }, 10000);

      Matter.Body.setVelocity(ball.body, { x: 0, y: 5 });

      wordsUsed[buttonIndex]++; // 해당 버튼의 사용된 워드 개수 증가
    }
  }
}

function buttonbg() {
  fill(255);
  rect(0, 0 - heights / 2, width, heights);
}
