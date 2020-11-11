const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const Event = mongoose.model("events");

module.exports = (app) => {

  /* Events */
  app.get("/api/events", requireLogin, async (req, res) => {
    const events = await Event.find();
    res.json(events);
  });

  app.post("/api/events", requireLogin, async (req, res) => {
    const { name, users, beers } = req.body;

    const event = new Event({
      name,
      users,
      beers,
      createdBy: req.user.id,
      createdDate: Date.now(),
    });
    await event.save();

    res.json(event);
  });
};
