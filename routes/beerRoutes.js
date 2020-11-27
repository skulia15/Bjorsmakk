const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const Beer = mongoose.model("beers");
const Type = mongoose.model("types");
const Brewery = mongoose.model("breweries");
const Country = mongoose.model("countries");

module.exports = (app) => {
  /* Beers */

  // GET BEERS
  app.get("/api/beers", requireLogin, async (req, res) => {
    const beers = await Beer.find().populate("type").populate("brewery");
    res.json(beers);
  });

  // GET SINGLE BEER
  app.get("/api/beers/:id", requireLogin, async (req, res) => {
    const beer = await Beer.findOne({ _id: req.params.id })
      .populate("type")
      .populate({
        path: "brewery",
        populate: "country",
      });
    res.json(beer);
  });

  // POST BEER
  app.post("/api/beers", requireLogin, async (req, res) => {
    const { name, percentage, type, brewery } = req.body;

    const beer = new Beer({
      name,
      percentage,
      type,
      brewery,
      createdBy: req.user.id,
      createdDate: Date.now(),
    });

    await beer.save();

    res.json(beer);
  });

  /* Types */

  // GET Types
  app.get("/api/types", requireLogin, async (req, res) => {
    const types = await Type.find();
    res.json(types);
  });

  // POST Type
  app.post("/api/types", requireLogin, async (req, res) => {
    const { typeName } = req.body;

    const type = new Type({
      typeName,
      createdBy: req.user.id,
      createdDate: Date.now(),
    });
    await type.save();

    res.json(type);
  });

  // GET BREWERIES
  app.get("/api/breweries", requireLogin, async (req, res) => {
    const breweries = await Brewery.find().populate("country");
    res.json(breweries);
  });

  // POST BREWERY
  app.post("/api/breweries", requireLogin, async (req, res) => {
    const { name, country } = req.body;

    const brewery = new Brewery({
      name,
      country,
      createdBy: req.user.id,
      createdDate: Date.now(),
    });
    await brewery.save();

    res.json(brewery);
  });

  /* Countries */
  app.get("/api/countries", requireLogin, async (req, res) => {
    const countries = await Country.find();
    res.json(countries);
  });

  app.post("/api/countries", requireLogin, async (req, res) => {
    const { name } = req.body;

    const country = new Country({
      name,
      createdBy: req.user.id,
      createdDate: Date.now(),
    });
    await country.save();

    res.json(country);
  });
};
