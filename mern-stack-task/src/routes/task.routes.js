const express = require("express");
const router = express.Router();

const Task = require("../models/task");

// reading data from database
router.get("/", async (req, res) => {
  // make a request for the database
  const tasks = await Task.find();
  // when client ask for '/' server response
  res.json(tasks);
});

// reading data by id
router.get("/:id", async (req, res) => {
  // make a request for the database
  const task = await Task.findById(req.params.id);
  // when client ask for '/' server response
  res.json(task);
});

// adding data to the database
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description });
  console.log(task);
  await task.save();
  res.json({ status: "Task Recorded" });
});

// update data
router.put("/:id", async (req, res) => {
  const { title, description } = req.body;
  const newTask = { title, description };
  await Task.findByIdAndUpdate(req.params.id, newTask);
  res.json({ status: "Task Modified" });
});

// delete data
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json({ status: "Task Deleted" });
});

module.exports = router;
