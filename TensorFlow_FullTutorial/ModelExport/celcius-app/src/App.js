import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

//Model and metadata URL
const url = {
  model: "http://localhost:8000/src/models/model.json", // loading model from server, the server is running on python
};

function App() {
  //React Hook
  const [model, setModel] = useState();
  const [textOut, setTextOut] = useState("");

  useEffect(() => {
    tf.ready().then(() => {
      loadModel(url);
    });
  }, []);

  // carga del modelo
  async function loadModel(url) {
    try {
      const model = await tf.loadLayersModel(url.model);
      setModel(model);
      console.log("model loaded");
    } catch (err) {
      console.log(err);
    }
  }

  // uso del modelo de predicion
  function handleChange(e) {
    console.log(e.target.value);

    if (model != null) {
      const tensor = tf.tensor1d([parseInt(e.target.value)]);

      const prediction = model.predict(tensor).dataSync();

      console.log(prediction);

      setTextOut(Math.round(prediction));
    }
  }

  return (
    <div>
      <input type="text" name="name" onChange={handleChange} />
      <div>{textOut}</div>
    </div>
  );
}

export default App;
