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
var ballSize = 160;
var grounds = [];
var groundCount = 3;
var groundWidth = 30;
var render;
var bg1 = 307;
var bg2 = 38;
var bg3 = 240;
var bg4 = 96;
let currentWordIndex = 0;

const linkLists = [
  ["i1.html", "i2.html", "i3.html", "i4.html", "i5.html"],
  ["g1.html"],
  ["about.html"],
  ["i1.html", "i2.html", "i3.html", "i4.html", "i5.html"],
  // 각 버튼별로 링크를 추가합니다.
];

const wordLists = [
  ["I", "I", "2", "랜", "커"],
  ["과"],
  ["조"],
  ["I", "I", "2", "랜", "커"],
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

  const initialLandY = windowHeight + 50; // 여기서 50은 여백입니다.
  land = Bodies.rectangle(width / 2, initialLandY, width, 100, options);

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
  colorMode(HSB, 100, 100, 100);
  buttonColors = [
    color(0, 0, 89),
    color(0, 0, 89),
    color(0, 0, 89),
    color(0, 0, 89),
  ];
  hovertextColors = [
    color(0, 0, 89),
    color(0, 0, 89),
    color(0, 0, 89),
    color(0, 0, 89),
  ];

  colorMode(HSB, 360, 100, 100);
  textColors = [
    color(205, 74, 96),
    color(29, 59, 54),
    color(337, 51, 100),
    color(153, 81, 70),
  ];
  hoverColors = [
    color(205, 74, 96),
    color(29, 59, 54),
    color(337, 51, 100),
    color(153, 81, 70),
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
    let buttonY = 5;
    let buttonText = "";

    if (i === 0) {
      buttonText = "Interaction";
    } else if (i === 1) {
      buttonText = "Graphic";
    } else if (i === 2) {
      buttonText = "Motion";
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
  // 뷰포트 높이에 맞게 land의 y 위치 계산
  const landY = windowHeight + 50;
  Matter.Body.setPosition(land, { x: land.position.x, y: landY });

  // land 그리기
  push();
  translate(land.position.x, land.position.y);
  fill(0);
  rectMode(CENTER);
  rect(0, 0, width, 90);
  pop();
  updateBallClickable();
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

  for (let i = 0; i < balls1.length; i++) {
    // 볼의 클릭 가능 여부를 체크하고 클릭 가능할 때만 링크를 엽니다.
    if (balls1[i].isClickable() && balls1[i].isClicked()) {
      openHtmlFile(balls1[i].htmlPath);
    }
  }
  for (let i = 0; i < balls2.length; i++) {
    if (balls2[i].isClickable() && balls2[i].isClicked()) {
      openHtmlFile(balls2[i].htmlPath);
    }
  }
  for (let i = 0; i < balls3.length; i++) {
    if (balls3[i].isClickable() && balls3[i].isClicked()) {
      openHtmlFile(balls3[i].htmlPath);
    }
  }
  for (let i = 0; i < balls4.length; i++) {
    if (balls4[i].isClickable() && balls4[i].isClicked()) {
      openHtmlFile(balls4[i].htmlPath);
    }
  }
}
function openHtmlFile(htmlPath) {
  if (htmlPath) {
    window.location.href = htmlPath;
  }
}
function updateBallClickable() {
  for (let i = 0; i < balls1.length; i++) {
    let ball = balls1[i];
    // 볼이 버튼의 영역을 벗어났을 때 클릭 가능하도록 플래그를 설정합니다.
    if (ball.body.position.y > heights) {
      ball.clickable = true;
    }
  }
  for (let i = 0; i < balls2.length; i++) {
    let ball = balls2[i];
    if (ball.body.position.y > heights) {
      ball.clickable = true;
    }
  }
  for (let i = 0; i < balls3.length; i++) {
    let ball = balls3[i];
    if (ball.body.position.y > heights) {
      ball.clickable = true;
    }
  }
  for (let i = 0; i < balls4.length; i++) {
    let ball = balls4[i];
    if (ball.body.position.y > heights) {
      ball.clickable = true;
    }
  }
  // 나머지 볼들에 대한 처리도 동일하게 수행
}
function handleButtonClick(buttonIndex) {
  if (wordsUsed[buttonIndex] < wordLists[buttonIndex].length) {
    currentWordList = wordLists[buttonIndex];
    let wordCount = currentWordList.length;
    let buttonColor = buttonColors[buttonIndex]; // Use buttonColors array here

    let word = currentWordList[wordsUsed[buttonIndex]];

    if (word) {
      let ball = new Ball(
        random((buttonIndex * width) / 4, ((buttonIndex + 1) * width) / 4),
        0,
        ballSize,
        ballSize,
        word,
        buttonColor,
        linkLists[buttonIndex][wordsUsed[buttonIndex]], // Provide the link
        textColors[buttonIndex]
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
  rect(0, 0 - heights / 3, width + 100, heights);
}
