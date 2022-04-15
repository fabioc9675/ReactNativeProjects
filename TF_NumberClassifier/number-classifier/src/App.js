import React, { useEffect, useRef, useState } from "react";

function App() {
  const canvasRef = useRef(null);
  const smallRef = useRef(null);
  const contextRef = useRef(null);
  // const smallCtxRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);

  // initialize canvas component
  useEffect(() => {
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
    context.lineWidth = 5;
    contextRef.current = context;

    // const smallCtxRef = smallCanvas.getContext("2d");
    // smallCtxRef.scale(2, 2);
    // smallCtxRef.lineCap = "round";
    // smallCtxRef.strokeStyle = "black";
    // smallCtxRef.lineWidth = 5;
    // smallCtxRef.current = context;
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

  const copyHandle = () => {
    resample_single(canvasRef.current, 28, 28, smallRef.current);
  };

  const resample_single = (canvas, width, height, resize_canvas) => {
    var width_source = canvas.width;
    var height_source = canvas.height;
    width = Math.round(width);
    height = Math.round(height);

    var ratio_w = width_source / width;
    var ratio_h = height_source / height;
    var ratio_w_half = Math.ceil(ratio_w / 2);
    var ratio_h_half = Math.ceil(ratio_h / 2);

    var ctx = canvas.getContext("2d");
    var ctx2 = resize_canvas.getContext("2d");
    var img = ctx.getImageData(0, 0, width_source, height_source);
    var img2 = ctx2.createImageData(width, height);
    var data = img.data;
    var data2 = img2.data;

    // function to resize
    for (var j = 0; j < height; j++) {
      for (var i = 0; i < width; i++) {
        var x2 = (i + j * width) * 4;
        var weight = 0;
        var weights = 0;
        var weights_alpha = 0;
        var gx_r = 0;
        var gx_g = 0;
        var gx_b = 0;
        var gx_a = 0;
        var center_y = (j + 0.05) * ratio_h;
        var yy_start = Math.floor(j * ratio_h);
        var yy_stop = Math.ceil((j + 1) * ratio_h);
        for (var yy = yy_start; yy < yy_stop; yy++) {
          var dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
          var center_x = (i + 0.5) * ratio_w;
          var w0 = dy * dy; // pre-calc part of w
          var xx_start = Math.floor(i * ratio_w);
          var xx_stop = Math.ceil((i + 1) * ratio_w);
          for (var xx = xx_start; xx < xx_stop; xx++) {
            var dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
            var w = Math.sqrt(w0 + dx * dx);
            if (w >= 1) {
              // pixel too far
              continue;
            }
            // hermite filter
            weight = 2 * w * w * w - 3 * w * w + 1;
            var pos_x = 4 * (xx + yy * width_source);
            // alpha
            gx_a += weight * data[pos_x + 3];
            weights_alpha += weight;
            // colors
            if (data[pos_x + 3] < 255) {
              weight = (weight * data[pos_x + 3]) / 250;
            }
            gx_r += weight * data[pos_x];
            gx_g += weight * data[pos_x + 1];
            gx_b += weight * data[pos_x + 2];
            weight += weight;
          }
        }
        data2[x2] = gx_r / weights;
        data2[x2 + 1] = gx_g / weights;
        data2[x2 + 2] = gx_b / weights;
        data2[x2 + 3] = gx_a / weights_alpha;
      }
    }

    // Ya que esta, exagerarlo. Blancos blancos y Negros negros

    for (var p = 0; p < data2.length; p += 4) {
      var gris = data2[p]; // esta en blanco y negro

      if (gris < 100) {
        gris = 0;
      } else {
        gris = 255;
      }

      data2[p] = gris;
      data2[p + 1] = gris;
      data2[p + 2] = gris;
    }

    ctx2.putImageData(img2, 0, 0);
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
      <button onClick={copyHandle}>Copiar</button>
    </div>
  );
}

export default App;
