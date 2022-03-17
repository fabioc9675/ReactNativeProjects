const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connection = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// function to get all task
app.get("/task", (req, res) => {
  const SELECT_QUERY = `SELECT * FROM TASKS`;

  connection.query(SELECT_QUERY, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  });
});

// function to add task
app.post("/addTask", (req, res) => {
  const ADD_QUERY = `INSERT INTO TASKS(TASK_NAME) VALUES ("${req.body.task}")`;

  console.log(ADD_QUERY);

  connection.query(ADD_QUERY, (err) => {
    if (err) console.log(err);
  });

  res.send("you can add task");
});

// function to delete task
app.get("/deleteTask", (req, res) => {
  res.send("delete task");
});

app.listen(4000, () => {
  console.log("running on port 4000");
});
