// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning
// https://github.com/CodingTrain/Toy-Neural-Network-JS/tree/master/examples/neuroevolution-flappybird

// This flappy bird implementation is adapted from:
// https://youtu.be/cXgA1d_E-jY&

// How big is the population
const TOTAL = 150;
// All birds for any given population
var birds = [];
// All birds for any given population
let savedBirds = [];
// Pipes
var pipes = [];

let counter = 0;

let cycles = 100;
let slider;

function keyPressed() {
    if (key === "s") {
        let bird = birds[0];
        let json = bird.brain.serialize();
        saveJSON(bird, "bird.json");
        console.log(json);
    }
}

function setup() {
    createCanvas(600, 600);
    tf.setBackend("cpu");
    slider = createSlider(1, 100, 1);
    for (let i = 0; i < TOTAL; i++) {
        birds[i] = new Bird();
    }

    // inicializacion de texto
    textSize(20);
    textAlign(LEFT, CENTER);
}

function draw() {
    for (let n = 0; n < slider.value(); n++) {
        if (counter % 75 == 0) {
            pipes.push(new Pipe());
        }
        counter++;

        for (var i = pipes.length - 1; i >= 0; i--) {
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

            // delete the birds floor or silly
            for (let i = birds.length - 1; i >= 0; i--) {
                if (birds[i].offScreen()) {
                    // include into new matrix the delete bird
                    savedBirds.push(birds.splice(i, 1)[0]);
                }
            }
        }

        for (let bird of birds) {
            bird.think(pipes);
            bird.update();
        }

        if (birds.length === 0) {
            counter = 0;
            nextGeneration();
            pipes = [];
        }
    }
    // All draw stuff
    background(0);

    for (let bird of birds) {
        bird.show();
    }

    for (let pipe of pipes) {
        pipe.show();
    }

    fill(255);
    text("generation = " + generations, 420, 50);
    text("Score = " + birds[0].score, 420, 80);
    //text("Fitness = " + nfc(prevFitness, 5), 420, 110);
    text("MaxScore = " + maxScore, 420, 110);
    text("Alive = " + birds.length, 420, 140);
}

// function keyPressed() {
//   if (key == " ") {
//     bird.up(); //console.log("SPACE");
//   }
// }
