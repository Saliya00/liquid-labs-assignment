require('dotenv').config();

require('./database/database');

const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

const postRoutes = require('./routes/post-route');

// Parse JSON body from http request to JS object
app.use(express.json());

// Send an API running message on /
app.get('/', (req, res) => {
  res.send('Node API is running!');
});

// Start the express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Pass all requests on /posts to posts router
app.use('/posts', postRoutes);
