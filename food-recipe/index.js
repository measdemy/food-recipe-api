const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const CATEGORIES_URL = 'https://themealdb.p.rapidapi.com/list.php/?c=list';

const fetchRecipeCategories = async (url) => {
  const headers = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'themealdb.p.rapidapi.com',
      'x-rapidapi-key': process.env.API_KEY,
    },
  };
  try {
    const data = await fetch(url, headers);
    const result = await data.json();
    //console.log('result', result);
    return result;
  } catch (err) {
    return { Error: err.stack };
  }
};

router.get('/', (req, res) => {
  res.json({ success: 'Hello recipe!' });
});

router.get('/categories', async (req, res) => {
  const data = await fetchRecipeCategories(CATEGORIES_URL);
  res.json(data);
});

router.get('/categories/:name', async (req, res) => {
  const name = req.params.name;
  const data = await fetchRecipeCategories(
    `https://themealdb.p.rapidapi.com/filter.php/?c=${name}`
  );
  res.json(data);
});

module.exports = router;
