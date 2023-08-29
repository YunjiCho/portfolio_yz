class Ball {
  constructor(x, y, w, h, label, col) {
    var options = {
      friction: 0.5,
      restitution: 0.9,
    };

    this.body = Bodies.rectangle(x, y, w, h, options);

    this.w = w; // Store width and height as properties
    this.h = h;
    this.label = label; // Store the provided label in the object
    this.col = col;
    World.add(world, this.body);
  }

  show() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    fill(0, 0, 89); // Use this.col for filling
    noStroke();
    rect(0, 0, this.w, this.h, 100, 100, 100, 100);
    strokeWeight(6);
    stroke(this.col);
    fill(this.col);
    textAlign(CENTER, CENTER);
    textSize(80); // Adjusted text size for visibility
    text(this.label, 0, 0); // Display the stored label
    pop();
  }
}
