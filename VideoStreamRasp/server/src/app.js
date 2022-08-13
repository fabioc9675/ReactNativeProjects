const express = require("express");
const app = express();

// creation of http server form express
const http = require("http").Server(app);

// to create a communication we will work with socket io
const io = require("socket.io")(http);

// routes
app.use(require("./routes/littlezoom.routes"));

// static HTML files
app.use(express.static(__dirname + "/public"));

module.exports = http;
