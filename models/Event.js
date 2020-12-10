const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
  name: { type: String, required: [true, "Event requires a name"] },
  users: [{ type: Schema.ObjectId, ref: "users" }],
  beers: [{ type: Schema.ObjectId, ref: "beers" }],

  createdBy: { type: Schema.Types.ObjectId, ref: "users" },
  createdDate: Date,
});

mongoose.model("events", eventSchema);
