import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import resample_single from "./resize";

// Model URL
const url = {
  model: "http://localhost:8000/number-classifier/assets/model/model.json", // loaded from server runing on python localhost:8000
};

function App() {
  const canvasRef = useRef(null);
  const smallRef = useRef(null);
  const contextRef = useRef(null);
  const smallCtxRef = useRef(null);

  const [model, setModel] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const [textOut, setTextOut] = useState("");

  // function to load the model
  async function loadModel(url) {
    try {
      const model = await tf.loadLayersModel(url.model);
      setModel(model);
      console.log("Model loaded");
    } catch (err) {
      console.log(err);
    }
  }

  // initialize canvas component
  useEffect(() => {
    // Load Model
    tf.ready().then(() => {
      loadModel(url);
    });

    const canvas = canvasRef.current;
    canvas.width = 500; // window.innerWidth*2
    canvas.height = 500; // window.innerHeight*2
    canvas.style.width = `${500 / 2}px`; // window.innerWidth*2
    canvas.style.height = `${500 / 2}px`; // window.innerHeight*2

    const smallCanvas = smallRef.current;
    smallCanvas.width = 28; // window.innerWidth*2
    smallCanvas.height = 28; // window.innerHeight*2
    smallCanvas.style.width = `${28 / 2}px`; // window.innerWidth*2
    smallCanvas.style.height = `${28 / 2}px`; // window.innerHeight*2

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 10;
    contextRef.current = context;

    const smallContext = smallCanvas.getContext("2d");
    // smallContext.scale(2, 2);
    // smallContext.lineCap = "round";
    // smallContext.strokeStyle = "black";
    // smallContext.lineWidth = 20;
    smallCtxRef.current = smallContext;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const eraseHandle = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const predictHandle = () => {
    if (model != null) {
      console.log("prediction");

      resample_single(canvasRef.current, 28, 28, smallRef.current);

      var imgData = smallCtxRef.current.getImageData(0, 0, 28, 28);
      var arr = []; // el arreglo completo
      var arr28 = []; // al llegar a 28 posiciones se pone en "arr" como un nuevo arreglo
      for (var p = 0; p < imgData.data.length; p += 4) {
        var valor = imgData.data[p + 3] / 255;
        arr28.push([valor]); // Agregar al array arr28 y normalizar de 0 a 1
        if (arr28.length === 28) {
          arr.push(arr28);
          arr28 = [];
        }
      }

      arr = [arr]; // es necesario meter el arreglo en otro arreglo para que tensorflow fucnione, esto por ser un tensor 4d en la forma 1, 28, 28, 1

      // creacion de variables para el modelo
      var tensor4d = tf.tensor4d(arr);
      var resultados = model.predict(tensor4d).dataSync();
      var mayorIndice = resultados.indexOf(Math.max.apply(null, resultados));

      setTextOut(mayorIndice);
      console.log(resultados);
      console.log("Prediccion = ", mayorIndice);
    }
  };

  return (
    <div>
      {" "}
      <h1>Hello World!</h1>
      <div>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          style={{ border: "2px solid black" }}
        />
        <canvas ref={smallRef} style={{ border: "2px solid black" }} />
      </div>
      <button onClick={eraseHandle}>Borrar</button>
      <button onClick={predictHandle}>Predict</button>
      <div>
        <h1>prediccion = {textOut}</h1>
      </div>
    </div>
  );
}

export default App;
