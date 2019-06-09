const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../src/templates/views'));
app.use(express.static(path.join(__dirname, '../public')));

// Setting up handlebar
hbs.registerPartials(path.join(__dirname, '../src/templates/partials'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Laimonas Čiurlionis'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.json({
      error: 'Please Enter Valid Address'
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.json({
        error
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.json({
          error
        });
      }
      res.json({
        location,
        forecastData
      });
    });
  });
});

app.get('/products', (req, res) => {
  // to run this if statemant only when something gone wrong
  if (!req.query.search) {
    return res.json({
      error: 'You must provide a search term'
    });
  }
  // query strings get provided on the end of the URL. We provide key value pairs to pass additional information to the server
  // http://localhost:3000/products?key=value&rating=5
  // information about that query string lives on request, so we can use req.query and this an object

  //Cannot set headers after they are sent to the client, we recieve this error if we are trying to sent two responses back

  console.log(req.query.search);
  res.json({
    products: []
  });
});

// match everything which was not matched so far
// also can be /help/*
app.get('*', (req, res) => {
  res.render('404', {
    error: 'Page Was Not Found',
    name: 'Laimonas'
  });
});

app.listen(3000, () => {
  console.log('Server is running...');
});
