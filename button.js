function button(x, y, label, col, tcol) {
  this.x = x;
  this.y = y;
  this.label = label;
  this.col = col;
  this.tcol = tcol;
  // 버튼 배경
  fill(this.col); // 여기서 col이 제대로 전달되는지 확인해주세요
  noStroke();
  rect(this.x, this.y, width / 3, heights, round, round, round, round);

  // 텍스트
  fill(this.tcol); // 텍스트는 흰색으로 설정
  stroke(this.tcol);
  textAlign(CENTER, CENTER);
  strokeWeight(3);
  textSize(50);
  text(this.label, this.x + width / 6, this.y + heights / 2 + 5);
}
