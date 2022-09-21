// Neural Network class working with tensorflow

class NeuralNetwork {
    constructor(a, b, c, d) {
        if (a instanceof tf.Sequential) {
            this.model = a;
            this.input_nodes = b;
            this.hidden_nodes = c;
            this.output_nodes = d;
        } else {
            this.input_nodes = a;
            this.hidden_nodes = b;
            this.output_nodes = c;
            this.model = this.createModel();
        }
    }

    // prediction function
    predict(inputs) {
        const xs = tf.tensor2d([inputs]); // conver input data to tensor
        const ys = this.model.predict(xs);
        xs.dispose(); // clean tensors, can be clean as is done in copy function
        const outputs = ys.dataSync();
        ys.dispose();
        // console.log(outputs);
        return outputs;
    }

    // mutation function
    mutate(rate) {
        tf.tidy(() => {
            // clean the mmory used by all the tensor created and never again used
            const weights = this.model.getWeights();
            const mutatedWeights = [];
            for (let i = 0; i < weights.length; i++) {
                let tensor = weights[i];
                let shape = weights[i].shape;
                let values = tensor.dataSync().slice();
                for (let j = 0; j < values.length; j++) {
                    if (random(1) < rate) {
                        let w = values[j];
                        values[j] = w + randomGaussian();
                    }
                }
                let newTensor = tf.tensor(values, shape);
                mutatedWeights[i] = newTensor;
            }
            this.model.setWeights(mutatedWeights);
        });
    }

    // create a copy of the model
    copy() {
        return tf.tidy(() => {
            const modelCopy = this.createModel();
            const weights = this.model.getWeights();
            const weightsCopies = [];
            for (let i = 0; i < weights.length; i++) {
                weightsCopies[i] = weights[i].clone();
            }
            modelCopy.setWeights(weights);
            return new NeuralNetwork(
                modelCopy,
                this.input_nodes,
                this.hidden_nodes,
                this.output_nodes
            );
        });
    }

    // dispose fucntion
    dispose() {
        this.model.dispose();
    }

    // function to create tensorflow model
    createModel() {
        const model = tf.sequential();
        // creating layers config
        const hidden = tf.layers.dense({
            units: this.hidden_nodes,
            inputShape: [this.input_nodes],
            activation: "sigmoid",
        });
        const output = tf.layers.dense({
            units: this.output_nodes,
            activation: "softmax",
        });
        // adding layers
        model.add(hidden);
        model.add(output);
        // compile model
        // this.model.compile({})
        return model;
    }
}
