const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connection = require("./models/database");
const authRoutes = require("./routes/authRoutes");

const app = express();

var Task = require("./models/task");

app.use(cors());
app.use(bodyParser.json());

// function to get all task
app.get("/task", async (req, res) => {
  // make a query through sequelize
  const response = await Task.findAll()
    .then(function (data) {
      const result = { success: true, data: data };
      return result;
    })
    .catch((error) => {
      const result = { success: false, error: error };
      return result;
    });

  console.log(response);
  //res.send(response);
  res.json(response);
});

// function to add task
app.post("/addTask", (req, res) => {
  const ADD_QUERY = `INSERT INTO TASKs(TASK_NAME) VALUES ("${req.body.task}")`;

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

// link server functions to authentication methods
app.use(authRoutes);

app.listen(4000, () => {
  console.log("running on port 4000");
});
