// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning
// https://github.com/CodingTrain/Toy-Neural-Network-JS/tree/master/examples/neuroevolution-flappybird

// This flappy bird implementation is adapted from:
// https://youtu.be/cXgA1d_E-jY&

// Mutation function to be passed into bird.brain
function mutate(x) {
    if (random(1) < 0.1) {
        let offset = randomGaussian() * 0.5;
        let newx = x + offset;
        return newx;
    } else {
        return x;
    }
}

class Bird {
    constructor(brain) {
        // position and size of bird
        this.x = 64;
        this.y = height / 2;
        this.r = 12;

        // gravity, lift and velocity
        this.gravity = 0.8;
        this.lift = -12;
        this.velocity = 0;

        // Variables realte with the learning process
        this.score = 0;
        this.fitness = 0;
        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(4, 4, 2); // inputs(4: y bird, x pipe, y up pipe, y down pipe), hidden(4: don't care), outputs(1: jump or not)
        }
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

    mutate() {
        this.brain.mutate(mutate);
    }

    // This is the key function now that decides
    // if it should jump or not jump!
    think(pipes) {
        // find the closest pipe
        let closest = null;
        let closestD = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            let d = pipes[i].x - this.x;
            if (d < closestD && d > 0) {
                closest = pipes[i];
                closestD = d;
            }
        }

        let inputs = [];
        inputs[0] = this.y / height; // normalizing data
        inputs[1] = closest.top / height;
        inputs[2] = closest.bottom / height;
        inputs[3] = closest.x / width;

        //let inputs = [2.0, 0.5, 0.2, 0.3];
        let output = this.brain.predict(inputs);
        if (output[0] > output[1]) {
            this.up();
        }
    }

    // Update bird's position based on velocity, gravity, etc.
    update() {
        this.score++;

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
