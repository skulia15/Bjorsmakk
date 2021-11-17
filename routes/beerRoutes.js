const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const Beer = mongoose.model("beers");
const Type = mongoose.model("types");
const Brewery = mongoose.model("breweries");
const Country = mongoose.model("countries");
const Rating = mongoose.model("ratings");

const ObjectId = require("mongoose").Types.ObjectId;

module.exports = (app) => {
  /* Beers */

  // GET BEERS
  app.get("/api/beers", requireLogin, async (req, res) => {
    const beers = await Beer.find().populate("type").populate({
      path: "brewery",
      populate: "country",
    });
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

  // PUT BEER
  app.put("/api/beers/:id", requireLogin, async (req, res) => {
    const { id } = req.params;
    const { name, percentage, type, brewery } = req.body;
    const beer = await Beer.findOne({ _id: id });

    beer.name = name;
    beer.percentage = percentage;
    beer.type = type;
    beer.brewery = brewery;
    // TODO: ADD UPDATED BY / AT ??

    await beer.save();

    res.json(beer);
  });

  // DELETE BEER
  app.delete("/api/beers/:id", requireLogin, async (req, res) => {
    const { id } = req.params;

    const delResult = await Beer.findByIdAndDelete({ _id: id });
    res.json(delResult);
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

  // GET SINGLE BREWERY
  app.get("/api/breweries/:id", requireLogin, async (req, res) => {
    const brewery = await Brewery.findOne({ _id: req.params.id }).populate(
      "country"
    );
    res.json(brewery);
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

  
  // PUT BREWERY
  app.put("/api/breweries/:id", requireLogin, async (req, res) => {
    const { id } = req.params;
    const { name, country} = req.body;
    const brewery = await Brewery.findOne({ _id: id });

    brewery.name = name;
    brewery.country = country;
    // TODO: ADD UPDATED BY / AT ??

    await brewery.save();

    res.json(brewery);
  });

  // GET BEERS FOR BREWERY
  app.get("/api/breweries/:id/beers", requireLogin, async (req, res) => {
    const beersForBrewery = await Beer.find({
      brewery: req.params.id,
    }).populate("type");
    res.json(beersForBrewery);
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
    country
      .save()
      .then(function (country) {
        res.json(country);
      })
      .catch(function (err) {
        if (err.name == "ValidationError") {
          console.error("Error Validating!", err);
          res.status(422).json(err);
        } else {
          console.error(err);
          res.status(500).json(err);
        }
      });
  });

  /* Ratings */

  // GET USERS PREVIOUS RATING (FOR BEER IN CURRENT EVENT)
  app.get(
    "/api/ratings/:beerId/previousRating",
    requireLogin,
    async (req, res) => {
      const { eventId, ratedById } = req.query;
      const { beerId } = req.params;
      await Rating.findOne(
        {
          beer: new ObjectId(beerId),
          event: new ObjectId(eventId),
          user: new ObjectId(ratedById),
        },
        function (err, result) {
          if (err) {
            res.status(500).send(err);
          }
          if (!result) {
            res.status(200).send(null);
          }
          if (result) {
            res.json({ score: result.score, beerId: beerId });
          }
        }
      );
    }
  );

  // GET RATINGS FOR BEER
  app.get("/api/ratings/:beerId", requireLogin, async (req, res) => {
    const { beerId } = req.params;
    const beer = await Rating.find({ beer: new ObjectId(beerId) })
      .populate("event", "name")
      .populate("user");
    res.json(beer);
  });

  // SUBMIT RATING FOR BEER
  app.post("/api/ratings", requireLogin, async (req, res) => {
    const { eventId, beerId, ratedById, rating } = req.body;

    await Rating.findOne(
      {
        beer: new ObjectId(beerId),
        event: new ObjectId(eventId),
        user: new ObjectId(ratedById),
      },
      function (err, result) {
        if (err) {
          res.status(500).send(err);
        }
        if (!result) {
          const ratingEntry = new Rating({
            user: ratedById,
            beer: beerId,
            event: eventId,
            score: rating,
            createdBy: req.user.id,
            createdDate: Date.now(),
          });

          ratingEntry.save();
          res.json({ score: ratingEntry.score, beerId: beerId });
        }
        if (result) {
          result.score = rating;
          result.save();
          res.json({ score: result.score, beerId: beerId });
        }
      }
    );
  });
};
