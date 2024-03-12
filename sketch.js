var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;
const round = 0;
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
function calculateButtonWidths() {
  let totalLength = wordLists.reduce((acc, list) => acc + list.length, 0);
  let buttonWidths = wordLists.map(
    (list) => (windowWidth * list.length) / totalLength
  );
  return buttonWidths;
}

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
let ballsCreated = [false, false, false];
let totalWordCount = 0;
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
      pixelRatio: 0.01, // 이 부분에서 pixelRatio 값을 설정
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
    grounds.push(Bodies.rectangle(x, 10, groundWidth, windowHeight, options));
    World.add(world, grounds[i]);
  }
  updateWordLists(); // 초기 설정 시 한 번 호출
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
function calculateButtonWidths() {
  let buttonWidths = [];
  let totalLength = wordLists.reduce((acc, curr) => acc + curr.length, 0); // 모든 리스트의 길이 총합
  let scaleFactor = windowWidth / totalLength; // 총 길이에 대한 윈도우 너비의 비율

  for (let i = 0; i < wordLists.length; i++) {
    // 각 리스트의 길이에 비례하여 버튼 너비 계산
    let buttonWidth = wordLists[i].length * scaleFactor;
    buttonWidths.push(buttonWidth);
  }

  // 버튼 너비의 총합이 windowWidth와 같도록 조정
  let totalWidth = buttonWidths.reduce((acc, curr) => acc + curr, 0);
  if (totalWidth !== windowWidth) {
    // 버튼 너비들을 적절히 조정
  }

  return buttonWidths;
}
function draw() {
  background(255);
  fill(255);
  console.log(totalWordCount);

  // balls 배열을 그립니다.
  for (var i = 0; i < balls1.length; i++) {
    balls1[i].show();
  }
  for (var i = 0; i < balls2.length; i++) {
    balls2[i].show();
  }
  for (var i = 0; i < balls3.length; i++) {
    balls3[i].show();
  }

  // 각 버튼의 너비를 동적으로 계산하고 저장할 배열
  let buttonWidths = calculateButtonWidths();
  // 각 버튼의 X 위치를 계산하기 위해 누적 너비를 저장할 변수
  let accumulatedWidth = 0;

  // 배경 그리기 함수
  buttonbg();

  // 각 버튼을 그립니다.
  for (let i = 0; i < 3; i++) {
    let buttonX = accumulatedWidth;
    let buttonY = 5;
    let buttonWidth = buttonWidths[i]; // 계산된 버튼 너비 사용
    let buttonText = ["Interaction", "Graphic", "CHO"][i]; // 버튼 텍스트 설정
    let letterSpacing = 10;

    // 버튼 색상 결정
    let buttonColor = isClicked(
      mouseX,
      mouseY,
      accumulatedWidth,
      buttonY,
      buttonWidth,
      heights
    )
      ? hoverColors[i]
      : buttonColors[i];
    let textColor = isClicked(
      mouseX,
      mouseY,
      accumulatedWidth,
      buttonY,
      buttonWidth,
      heights
    )
      ? hovertextColors[i]
      : textColors[i];

    // 버튼 그리기 함수 호출. 실제 버튼을 그리는 함수를 호출하거나, 여기에 해당하는 로직을 구현합니다.
    button(
      buttonX,
      buttonY,
      buttonWidth,
      buttonText,
      buttonColor,
      textColor,
      letterSpacing
    );

    // 다음 버튼의 X 위치를 위해 누적 너비 업데이트
    accumulatedWidth += buttonWidth;
  }

  // 뷰포트 높이에 맞게 land의 y 위치 계산 및 그리기
  const landY = windowHeight + 50;
  Matter.Body.setPosition(land, { x: land.position.x, y: landY });
  push();
  translate(land.position.x, land.position.y);
  fill(255);
  rectMode(CENTER);
  rect(0, 0, width, 90);
  pop();
  updateBallClickable();
}

// 클릭 여부를 결정하는 함수. mouseX, mouseY, 버튼의 x, y, 너비, 높이를 기반으로 클릭 여부를 판단합니다.
function isClicked(
  mouseX,
  mouseY,
  buttonX,
  buttonY,
  buttonWidth,
  buttonHeight
) {
  return (
    mouseX > buttonX &&
    mouseX < buttonX + buttonWidth &&
    mouseY > buttonY &&
    mouseY < buttonY + buttonHeight
  );
}

function updateWordLists() {
  totalWordCount = 0; // totalWordCount 초기화
  for (let i = 0; i < wordLists.length; i++) {
    totalWordCount += wordLists[i].length;
  }
  // 필요한 경우 여기서 추가적인 업데이트 작업 수행
}
// 데이터를 업데이트하는 함수 예제
function addNewWordList(newWordList) {
  wordLists.push(newWordList); // 새로운 단어 리스트를 wordLists에 추가
  updateWordLists(); // wordLists가 변경되었으니 totalWordCount 업데이트
}
function mousePressed() {
  for (let i = 0; i < 3; i++) {
    let buttonX = (i * width) / 3;
    let buttonY = -5;
    let buttonWidth = width / 3;
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

  // 공 클릭 처리
  for (let i = 0; i < balls1.length; i++) {
    let ball = balls1[i];
    if (
      ball.isClickable() &&
      ball.isClicked() &&
      ball.body.position.y > heights
    ) {
      // ball 클릭 시 시간 간격을 두고 떨어지게 함
      setTimeout(() => {
        openHtmlFile(ball.htmlPath);
      }, currentBallIndex * 500); // 각 ball을 1초 간격으로 떨어지게 하려면 1000ms 간격을 사용
      currentBallIndex++;
    }
  }
  for (let i = 0; i < balls2.length; i++) {
    let ball = balls2[i];
    if (
      ball.isClickable() &&
      ball.isClicked() &&
      ball.body.position.y > heights
    ) {
      openHtmlFile(ball.htmlPath);
    }
  }
  for (let i = 0; i < balls3.length; i++) {
    let ball = balls3[i];
    if (
      ball.isClickable() &&
      ball.isClicked() &&
      ball.body.position.y > heights
    ) {
      openHtmlFile(ball.htmlPath);
    }
  }
  // for (let i = 0; i < balls4.length; i++) {
  //   let ball = balls4[i];
  //   if (ball.isClickable() && ball.isClicked() && ball.body.position.y > heights) {
  //     openHtmlFile(ball.htmlPath);
  //   }
  // }
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
    if (ball.body.position.y > heights + 100) {
      ball.clickable = true;
    }
  }
  for (let i = 0; i < balls2.length; i++) {
    let ball = balls2[i];
    if (ball.body.position.y > heights + 100) {
      ball.clickable = true;
    }
  }
  for (let i = 0; i < balls3.length; i++) {
    let ball = balls3[i];
    if (ball.body.position.y > heights + 100) {
      ball.clickable = true;
    }
  }
  // for (let i = 0; i < balls4.length; i++) {
  //   let ball = balls4[i];
  //   if (ball.body.position.y > heights) {
  //     ball.clickable = true;
  //   }
  // }
  // 나머지 볼들에 대한 처리도 동일하게 수행
}
function handleButtonClick(buttonIndex) {
  if (
    !ballsCreated[buttonIndex] &&
    wordsUsed[buttonIndex] < wordLists[buttonIndex].length
  ) {
    currentWordList = wordLists[buttonIndex];
    let wordCount = currentWordList.length;
    let buttonColor = buttonColors[buttonIndex];

    // Create an array to hold all the balls for this button
    let balls = [];

    for (let i = 0; i < wordCount; i++) {
      let word = currentWordList[i];

      if (word) {
        let ball = new Ball(
          random((buttonIndex * width) / 3, ((buttonIndex + 1) * width) / 3),
          0,
          ballSize,
          ballSize,
          word,
          buttonColor,
          linkLists[buttonIndex][i],
          textColors[buttonIndex]
        );

        balls.push(ball);
      }
    }

    // Add the balls to the appropriate array (balls1, balls2, balls3, etc.)
    if (buttonIndex === 0) {
      balls1 = balls;
    } else if (buttonIndex === 1) {
      balls2 = balls;
    } else if (buttonIndex === 2) {
      balls3 = balls;
    }

    // Mark that the balls for this button have been created
    ballsCreated[buttonIndex] = true;

    // You can also set sleeping and velocity for each ball if needed

    wordsUsed[buttonIndex] += wordCount; // Update the number of words used
  }
}
function buttonbg() {
  fill(255);
  noStroke();
  rect(0, 0 - heights / 3, width + 100, heights);
}
