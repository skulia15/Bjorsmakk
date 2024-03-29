const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const Event = mongoose.model("events");

const ObjectId = require("mongoose").Types.ObjectId;

module.exports = (app) => {
  /* Events */
  app.get("/api/events", requireLogin, async (req, res) => {
    const events = await Event.find({ "users": ObjectId(req.user.id) });
    res.json(events);
  });

  // GET SINGLE EVENT
  app.get("/api/events/:id", requireLogin, async (req, res) => {
    const events = await Event.findOne({ _id: req.params.id })
      .populate({
        path: "beers",
        populate: ["brewery", "type"],
      });
    res.json(events);
  });

  app.post("/api/events", requireLogin, async (req, res) => {
    console.log(req.body);
    
    const { name, user, beer } = req.body;
    console.log('EVENT', req.body);

    const userIds = user.map((singleUser) => {
      return singleUser.id;
    });

    const beerIds = beer.map((singleBeer) => {
      return singleBeer.id;
    });

    const event = new Event({
      name,
      users: userIds,
      beers: beerIds,
      createdBy: req.user.id,
      createdDate: Date.now(),
    });
    await event.save();

    res.json(event);
  });
};
