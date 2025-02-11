const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./Controllers/users');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// ...existing code...

app.use('/api', userRouter);

mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to the database');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Database connection error:', error);
});