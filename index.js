require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const recipe = require('./food-recipe/index');

app.use(express.json());

app.use(
  cors({
    origin: '*',
  })
);

app.use('/', recipe);

app.listen(port, () => console.log(`App listening on port ${port}`));
