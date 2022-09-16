// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning
// https://github.com/CodingTrain/Toy-Neural-Network-JS/tree/master/examples/neuroevolution-flappybird

// This flappy bird implementation is adapted from:
// https://youtu.be/cXgA1d_E-jY&

class Bird {
    constructor() {
        // position and size of bird
        this.x = 64;
        this.y = height / 2;
        this.r = 12;

        // gravity, lift and velocity
        this.gravity = 0.8;
        this.lift = -12;
        this.velocity = 0;
    }

    // Display the bird
    show() {
        fill(255, 100);
        stroke(255);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    // Jump up
    up() {
        this.velocity += this.lift;
    }

    // Update bird's position based on velocity, gravity, etc.
    update() {
        this.velocity += this.gravity;
        // this.velocity *= 0.9;
        this.y += this.velocity;

        if (this.y > height) {
            this.y = height;
            this.velocity = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }
}
