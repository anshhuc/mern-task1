const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema
const Student = mongoose.model("Student", {
  name: String,
  course: String
});

// GET data
app.get("/students", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

// POST data
app.post("/students", async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.json(newStudent);
});

app.listen(5000, () => console.log("Server running on port 5000"));