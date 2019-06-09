const request = require('request');

const geoCode = (adress, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    adress
  )}.json?access_token=pk.eyJ1IjoibGFpbW9uYXNjIiwiYSI6ImNqdnBvcXJpYzAxMDY0YW1zN2VyNzZobG0ifQ.7Cl8EYxvZ6VHMX-AToa9Rg&limit=1`;
  request({ url, json: true }, (err, { body }) => {
    console.log(body);
    if (err) {
      // here we want to create a func which is highly reusable. When somenoe calls geocode they might want to do something else with error msg. So instead of logging out the error, we are going to pass it back to the callback. The callback can choose what to do.
      cb('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      cb('Unable to find location. Try another search', undefined);
    } else {
      cb(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

// geocode('Vilnius', (error, data) => {

// })

module.exports = geoCode;
