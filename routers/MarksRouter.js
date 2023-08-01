// marksRouter.js
const express = require('express');
const router = express.Router();
const Marks = require('../models/MarksModels');

// POST /marks - Add student marks
router.post('/addmarks', async (req, res) => {
  const { physics, chemistry, maths, english } = req.body;

  try {
    // Create a new marks instance
    const newMarks = new Marks({
      physics,
      chemistry,
      maths,
      english
    });

    // Save the marks to the database
    const savedMarks = await newMarks.save();
    res.status(201).json(savedMarks);
  } catch (err) {
    console.error('Error saving student marks:', err);
    res.status(500).json({ error: 'Failed to save student marks' });
  }
});

// PUT /marks/:id - Edit student marks
router.put('/editmarks/:id', async (req, res) => {
  const marksId = req.params.id;
  const { physics, chemistry, maths, english } = req.body;

  try {
    // Find the marks by ID and update its data
    const updatedMarks = await Marks.findByIdAndUpdate(
      marksId,
      {
        physics,
        chemistry,
        maths,
        english
      },
      { new: true }
    );

    if (!updatedMarks) {
      res.status(404).json({ error: 'Student marks not found' });
    } else {
      res.json(updatedMarks);
    }
  } catch (err) {
    console.error('Error updating student marks:', err);
    res.status(500).json({ error: 'Failed to update student marks' });
  }
});

module.exports = router;
