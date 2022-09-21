// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning
// https://github.com/CodingTrain/Toy-Neural-Network-JS/tree/master/examples/neuroevolution-flappybird

// This flappy bird implementation is adapted from:
// https://youtu.be/cXgA1d_E-jY&

let generations = 0;
let lastScore = 0;
let lastFitness = 0;
let prevFitness = 0;

function nextGeneration() {
    // calculate fitness
    calculateFitness();

    for (let i = 0; i < TOTAL; i++) {
        birds[i] = pickOne();
    }
    savedBirds = []; // after next generation clean savedBirds

    // generation information
    generations++;
    // console.log(
    //     "next generation = ",
    //     generations,
    //     ", score = ",
    //     lastScore,
    //     ", Fitness = ",
    //     lastFitness
    // );

    prevFitness = lastFitness;
    lastScore = 0;
    lastFitness = 0;
}

function pickOne() {
    var index = 0;
    var r = random(1);

    while (r > 0) {
        r = r - savedBirds[index].fitness;
        index++;
    }
    index--;

    let bird = savedBirds[index];
    let child = new Bird(bird.brain);
    child.mutate(); // make a mutation in next generation

    if (lastScore < bird.score) {
        lastScore = bird.score;
    }
    if (lastFitness < bird.fitness) {
        lastFitness = bird.fitness;
    }

    return child;
}

function calculateFitness() {
    let sum = 0;
    for (let bird of savedBirds) {
        sum += bird.score;
    }

    for (let bird of savedBirds) {
        bird.fitness += bird.score / sum; // normalizing
    }
}
