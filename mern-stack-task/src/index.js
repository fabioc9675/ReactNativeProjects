const express = require("express");
const morgan = require("morgan");
const app = express(); // server

// Settings
app.set("port", process.env.PORT || 3000); // takes the port provided for the server or other

// Middlewares
app.use(morgan("dev")); // creates a log for clients that request access to the app
app.use(express.json()); // every data that arrives to the server enters to this and it verifies if the data is a json

// Routes

// Static files

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
