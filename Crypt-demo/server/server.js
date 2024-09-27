const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cryptoRoutes = require('./routes/cryptography');

const app = express();
const port = 3000;

app.use(cors());  // Enable CORS for all routes

app.use(bodyParser.json());
app.use('/api/cryptography', cryptoRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
