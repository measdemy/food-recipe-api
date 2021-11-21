const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const fetchRecipeCategories = async () => {
  const url = 'https://themealdb.p.rapidapi.com/list.php/?c=list';
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
  const data = await fetchRecipeCategories();
  res.json(data);
});

module.exports = router;
