const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// function to get all task
app.get("/task", (req, res) => {
  res.send("list of all task");
});

// function to add task
app.get("/addTask", (req, res) => {
  res.send("you can add task");
});

// function to delete task
app.get("/deleteTask", (req, res) => {
  res.send("delete task");
});

app.listen(4000, () => {
  console.log("running on port 4000");
});
