// studentRouter.js
const express = require('express');
const router = express.Router();
const Student = require('../models/StudentModel');
const Marks = require('../models/MarksModels');

// POST /students - Add a new student with marks
router.post('/add', async (req, res) => {
  const { name, father_name, address, mobile_no, class: studentClass, section, marks } = req.body;

  try {
    // Create a new marks instance
    const newMarks = new Marks({
      physics: marks.physics,
      chemistry: marks.chemistry,
      maths: marks.maths,
      english: marks.english
    });

    // Save the marks to the database
    const savedMarks = await newMarks.save();

    // Create a new student instance with the reference to the marks
    const newStudent = new Student({
      name,
      father_name,
      address,
      mobile_no,
      class: studentClass,
      section,
      marks: savedMarks._id // Set the reference to the saved marks document
    });

    // Save the student to the database
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    console.error('Error saving student:', err);
    res.status(500).json({ error: 'Failed to save student' });
  }
});

// PUT /students/:id - Edit an existing student with marks
router.put('/students/:id', async (req, res) => {
  const studentId = req.params.id;
  const { name, father_name, address, mobile_no, class: studentClass, section, marks } = req.body;

  try {
    // Find the student by ID
    const existingStudent = await Student.findById(studentId);

    if (!existingStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Update the student details
    existingStudent.name = name;
    existingStudent.father_name = father_name;
    existingStudent.address = address;
    existingStudent.mobile_no = mobile_no;
    existingStudent.class = studentClass;
    existingStudent.section = section;

    // Update the student marks (if provided)
    if (marks) {
      // Check if the student has existing marks
      if (!existingStudent.marks) {
        // If not, create new marks and set the reference
        const newMarks = new Marks({
          physics: marks.physics,
          chemistry: marks.chemistry,
          maths: marks.maths,
          english: marks.english
        });

        existingStudent.marks = await newMarks.save();
      } else {
        // If existing marks exist, update them
        existingStudent.marks.physics = marks.physics;
        existingStudent.marks.chemistry = marks.chemistry;
        existingStudent.marks.maths = marks.maths;
        existingStudent.marks.english = marks.english;

        await existingStudent.marks.save();
      }
    }

    // Save the updated student to the database
    const updatedStudent = await existingStudent.save();
    res.json(updatedStudent);
  } catch (err) {
    console.error('Error updating student:', err);
    res.status(500).json({ error: 'Failed to update student' });
  }
});

module.exports = router;
