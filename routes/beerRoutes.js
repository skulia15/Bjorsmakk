const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Beer = mongoose.model('beers');
const Brewery = mongoose.model('breweries');

module.exports = app => {

  // GET BEERS
  app.get('/api/beers', requireLogin, async (req, res) => {
    const beers = await Beer.find();
    console.log('BEERS FROM API', beers);

    res.send(beers);
  });


  // POST BEER
  app.post('/api/beers', requireLogin, async (req, res) => {
    const { name, percentage } = req.body;

    const beer = new Beer({
      name,
      percentage,
      createdBy: req.user.id,
      createdDate: Date.now()
    });
    await beer.save();

    res.send(beer);
  });

   // GET BREWERIES
   app.get('/api/breweries', requireLogin, async (req, res) => {
    const breweries = await Brewery.find();
    console.log('BREWERIES FROM API', breweries);
    res.send(breweries);
  });

  // POST BREWERY
  app.post('/api/breweries', requireLogin, async (req, res) => {
    const { name, country } = req.body;

    const brewery = new Brewery({
      name,
      country,
      createdBy: req.user.id,
      createdDate: Date.now()
    });
    await brewery.save();

    res.send(brewery);
  });
};
