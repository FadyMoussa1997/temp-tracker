const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
require("dotenv").config();

app.get('/', (req, res) => {
  res.send('weather api server');
});


app.get('/weatherdata', async (req, res) => {
    try {
      const city = req.query.city || 'cairo' ; 
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_KEY}&units=metric`);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(error.response ? error.response.status : 500).json({ error: 'Failed to fetch weather data' });
    }
  });




  app.get('/forecastdata', async (req, res) => {

   try {
    const city = req.query.city || 'cairo' ;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.WEATHER_KEY}&units=metric`);

    res.json(response.data);
   } catch (error) {
    console.error('Error fetching weather data:', error);
      res.status(error.response ? error.response.status : 500).json({ error: 'Failed to fetch weather data' });


   }

   });


  









app.listen(port, () => {
    console.log(`Server started at: ${port}`);
  });