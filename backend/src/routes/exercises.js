const Exercise = require('../models/Exercise');

const router = require('express').Router();

// All exercises
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (e) {
    next(e);
  }
});

// Add exercise
router.post('/add', async (req, res, next) => {
  const username = req.body.username;
  const description = req.body.description;
  const reps = Number(req.body.reps);
  const date = Date.parse(req.body.date);

  try {
    await new Exercise({ username, description, reps, date }).save();
    res.json({ message: 'Exercise added', success: true });
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res
        .status(400)
        .json({ message: 'Make sure to set all fields', success: false });
    }
    next(e);
  }
});

// Get exercise
router.get('/:id', async (req, res, next) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.json(exercise);
  } catch (e) {
    next(e);
  }
});

// Delete exercise
router.delete('/:id', async (req, res, next) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.json({ message: 'Exercise deleted', success: true });
  } catch (e) {
    next(e);
  }
});

// Update exercise
router.put('/update/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.reps = Number(req.body.reps);
    exercise.date = Date.parse(req.body.date);

    await exercise.save();
    res.json({ message: 'Exercise updated', success: true });
  } catch (e) {
    next(e);
  }
});

router.use((err, req, res, next) => {
  if (err.name === 'CastError') {
    err.message = `ìd ${req.url} not found`;
    err.statusCode = 400;
  }
  next(err);
});

router.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500);

  let json = { message: err.message, success: false };
  if (process.env.NODE_ENV !== 'production') {
    json.stack = err.stack;
  }
  res.json(json);
  next(err);
});

module.exports = router;
