const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Marks = require("../models/MarksModels"); // Import the Marks model

// Define the Student Schema
const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  father_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobile_no: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  marks: {
    type: Schema.Types.ObjectId,
    ref: "Marks", // Reference the Marks model
    default: null,
  },
});

// Create the Student model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
