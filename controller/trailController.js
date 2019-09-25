const fetch = require('node-fetch');

//API request REI API with a latitute and longitude of central LA, with a search radius of 20 miles with 100 max results with a minimum of 3 stars and my user key
const trailController = {};

//middleware functuon to fetch trail information from REI API
trailController.getTrails = (req, res, next) => {
  let url = `https://www.hikingproject.com/data/get-trails?lat=${req.body.latitude}&lon=${req.body.longitude}&maxDistance=20&maxResults=100&minStars=3.5&key=200597455-cfbe6650f3776f2f486ae788a2ecf16b`;

  fetch(url)
    .then(res => res.json())
    .then(json => {
      res.locals.trails = json;
      return next();
    })
    .catch(err =>
      next({
        err: 'trailController.getTrails: ERROR: Check server logs for details'
      })
    );
};

module.exports = trailController;
