// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning
// https://github.com/CodingTrain/Toy-Neural-Network-JS/tree/master/examples/neuroevolution-flappybird

// This flappy bird implementation is adapted from:
// https://youtu.be/cXgA1d_E-jY&

// All birds for any given population
var bird;
// Pipes
var pipes = [];

function setup() {
    createCanvas(400, 600);
    bird = new Bird();

    pipes.push(new Pipe());
}

function draw() {
    background(0);

    for (var i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();

        if (pipes[i].hits(bird)) {
            console.log("HIT");
        }

        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }
    }

    bird.update();
    bird.show();

    if (frameCount % 100 == 0) {
        pipes.push(new Pipe());
    }
}

// function keyPressed() {
//   if (key == " ") {
//     bird.up(); //console.log("SPACE");
//   }
// }
