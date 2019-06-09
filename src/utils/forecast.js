const request = require('request');

const forecast = (lat, long, cb) => {
  const url = `https://api.darksky.net/forecast/5efe7484cd925b5c44aa3017da712b5e/${lat},${long}?units=si`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      cb('Unable to connect to weather services!', undefined);
    } else if (body.error) {
      cb('Unable to get temperature, because invalid coordinate');
    } else {
      cb(undefined, {
        dailyData: body.daily.data[0].summary,
        currTemp: body.currently.temperature,
        chanceOfRain: body.currently.precipProbability
      });
    }
  });
};

module.exports = forecast;
