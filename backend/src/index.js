const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const usersRouter = require('./routes/users');
const exercisesRouter = require('./routes/exercises');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Database
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () =>
  console.log('Mongodb connection established')
);

// Routes
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
