function button(x, y, w, label, col, tcol, r1, r2, r3, r4) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.label = label;
  this.col = col;
  this.tcol = tcol;
  this.r1 = r1;
  this.r2 = r2;
  this.r3 = r3;
  this.r4 = r4;

  // 버튼 배경
  fill(this.col);
  noStroke(); // 버튼 배경의 외곽선을 없애기 위해 추가
  rect(this.x, this.y, this.w, heights, this.r1, this.r2, this.r3, this.r4);

  // 텍스트를 왼쪽 정렬로 설정
  fill(this.tcol);
  noStroke(); // 텍스트 외곽선을 없애기 위해 추가
  textAlign(LEFT, CENTER);
  textSize(50);
  // 텍스트의 x 위치를 버튼의 왼쪽에서 10% 떨어진 곳으로 설정
  text(this.label, this.x + this.w * 0.05, this.y + heights / 2);
}
