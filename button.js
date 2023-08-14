function button(x, y, label) {
  this.x = x;
  this.y = y;
  this.label = label;
  //버튼배경
  fill(0);
  noStroke();
  rect(this.x, this.y, width / 4, heights, round, round, round, round);

  //텍스트
  fill(255);
  stroke(255);
  textAlign(CENTER, CENTER);
  strokeWeight(4);
  textSize(60); // 글자 크기를 줄여서 버튼 안에 맞게 조절
  text(this.label, this.x + width / 8, this.y + heights / 2 + 5);
}
