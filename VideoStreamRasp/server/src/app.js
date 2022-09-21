const express = require("express");
const { Socket } = require("socket.io");
const app = express();

// creation of http server form express
const http = require("http").Server(app);

// to create a communication we will work with socket io
const io = require("socket.io")(http);

// routes
app.use(require("./routes/littlezoom.routes"));

// static HTML files
app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("socket connected: ", socket.id);
  socket.on("stream", (image) => {
    // emmit the evento to all the sockects connected
    socket.broadcast.emit("stream", image);
  });
});

// io.on("connection", function (socket) {
//   socket.on("stream", function (data) {
//     // listen on client emit 'data'
//     var frame = Buffer.from(data, "base64").toString();

//     io.emit("stream", frame); // emmit to socket
//   });
// });

module.exports = http;
