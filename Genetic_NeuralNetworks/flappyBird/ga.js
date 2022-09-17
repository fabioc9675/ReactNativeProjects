// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning
// https://github.com/CodingTrain/Toy-Neural-Network-JS/tree/master/examples/neuroevolution-flappybird

// This flappy bird implementation is adapted from:
// https://youtu.be/cXgA1d_E-jY&

function nextGeneration() {
    // calculate fitness
    calculateFitness();

    for (let i = 0; i < TOTAL; i++) {
        birds[i] = new Bird();
    }

    function calculateFitness() {
        let sun = 0;
        for (let bird of birds) {
            sum += bird.score;
        }

        for (let bird of birds) {
            bird.fitness += bird.score / sum; // normalizing
        }
    }
}
