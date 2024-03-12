function button(x, y, w, label, col, tcol) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.label = label;
  this.col = col;
  this.tcol = tcol;

  // 버튼 배경
  fill(this.col);
  noStroke();
  rect(this.x, this.y, this.w, heights, round);

  // 텍스트 중앙 정렬
  fill(this.tcol);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(50);
  text(this.label, this.x + this.w / 2, this.y + heights / 2);
}
