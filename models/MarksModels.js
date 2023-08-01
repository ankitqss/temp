const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Student Marks Schema
const studentMarksSchema = new Schema({
  student_id: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  physics: {
    type: Number,
    required: true
  },
  chemistry: {
    type: Number,
    required: true
  },
  maths: {
    type: Number,
    required: true
  },
  english: {
    type: Number,
    required: true
  }
});

// Create the Student Marks model
const StudentMarks = mongoose.model('StudentMarks', studentMarksSchema);

module.exports = StudentMarks;
