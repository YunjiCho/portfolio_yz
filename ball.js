class Ball {
  constructor(x, y, w, h, label) {
    this.body = Bodies.rectangle(x, y, w, h);
    this.label = label; // 입력한 글자를 label 프로퍼티에 저장
    World.add(world, this.body);
  }

  show() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    fill(150);
    rect(0, 0, this.w, this.h);
    strokeWeight(10);
    stroke(0);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(130);
    text(this.label, 0, 0); // label 프로퍼티의 글자를 출력
    pop();
  }
}
