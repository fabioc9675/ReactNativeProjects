const express = require("express");
const router = express.Router();

const Task = require("../models/task");

router.get("/", (req, res) => {
  // make a request for the database
  Task.find(function (err, tasks) {
    console.log(tasks);
  });

  // when client ask for '/' server response
  res.json({
    status: "API works!",
  });
});

module.exports = router;
