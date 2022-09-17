// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning
// https://github.com/CodingTrain/Toy-Neural-Network-JS/tree/master/examples/neuroevolution-flappybird

// This flappy bird implementation is adapted from:
// https://youtu.be/cXgA1d_E-jY&

// How big is the population
const TOTAL = 350;
// All birds for any given population
var birds = [];
// All birds for any given population
let savedBirds = [];
// Pipes
var pipes = [];

let counter = 0;

function setup() {
    createCanvas(600, 600);
    for (let i = 0; i < TOTAL; i++) {
        birds[i] = new Bird();
    }
}

function draw() {
    background(0);

    if (counter % 75 == 0) {
        pipes.push(new Pipe());
    }
    counter++;

    for (var i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();

        // delete the birds
        for (let j = birds.length - 1; j >= 0; j--) {
            if (pipes[i].hits(birds[j])) {
                // include into new matrix the delete bird
                savedBirds.push(birds.splice(j, 1)[0]);
            }
        }

        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }
    }

    for (let bird of birds) {
        bird.think(pipes);
        bird.update();
        bird.show();
    }

    if (birds.length === 0) {
        counter = 0;
        nextGeneration();
        pipes = [];
    }
}

// function keyPressed() {
//   if (key == " ") {
//     bird.up(); //console.log("SPACE");
//   }
// }
