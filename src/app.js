require('dotenv').config();

require('./database/database');

const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

const postsRoutes = require('./routes/routes');

// Send a response on GET requests on /
app.get('/', (req, res) => {
  res.send('Node API is running!');
});

// Start the express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/posts', postsRoutes);
