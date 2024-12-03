const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipe');

const app = express();
const port = 5000;

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/recipes', recipeRoutes);

mongoose.connect('mongodb://localhost:27017/chefIT', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});