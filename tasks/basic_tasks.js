// basic tasks
const express = require("express");
const router = express.Router();

// task and counter init
let tasks = [];
let idCounter = 1;

// get task
router.get("/tasks", (req, res) => {
    res.json(tasks);
  });

// post task
router.post("/tasks", (req, res, next) => {
    const { description, dueDate, status } = req.body;
    if (!description || !dueDate || !status) {
        const error = new Error("All fields are required");
        error.statusCode = 400; 
        return next(error);
    }
    const newTask = { id: idCounter++, description, dueDate, status };
    tasks.push(newTask);
    res.status(201).json(newTask);
  });

// put task
router.put("/tasks/:id", (req, res, next) => {
    const { id } = req.params;
    const { description, dueDate, status } = req.body;
    // find task according to id
    const task = tasks.find((task) => task.id === parseInt(id));
    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404; 
        return next(error);
    }
    // updating all fields 
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (status) task.status = status;
  
    res.json(task);
  });

// delete task
router.delete("/tasks/:id", (req, res, next) => {
    const { id } = req.params;
    //find only the index
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
    if (taskIndex === -1) {
        const error = new Error("Task not found");
        error.statusCode = 404; 
        return next(error);
    }
    // 1 is number of elements should be deleted
    tasks.splice(taskIndex, 1);
    res.status(204).send();
  });

 module.exports = router;
