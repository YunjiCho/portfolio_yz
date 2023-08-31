class Ball {
  constructor(x, y, w, h, label, col, link, textColor) {
    var options = {
      friction: 0.5,
      restitution: 0.9,
    };

    this.body = Bodies.rectangle(x, y, w, h, options);

    this.w = w; // Store width and height as properties
    this.h = h;
    this.label = label; // Store the provided label in the object
    this.col = col;
    this.link = link; // Store the provided link in the object
    this.textColor = textColor;
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
    stroke(this.textColor);

    // Use this.textColor for text color
    fill(this.textColor);
    textAlign(CENTER, CENTER);
    textSize(80); // Adjusted text size for visibility
    text(this.label, 0, 0); // Display the stored label
    pop();
  }

  isClicked() {
    // Check if the ball is clicked
    return (
      mouseX > this.body.position.x - this.w / 2 &&
      mouseX < this.body.position.x + this.w / 2 &&
      mouseY > this.body.position.y - this.h / 2 &&
      mouseY < this.body.position.y + this.h / 2
    );
  }
}
