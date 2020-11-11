const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
  name: String, // beerId
  users: [
    {
      type: Schema.ObjectId,
      ref: "User",
    },
  ],
  beers: [
    {
      type: Schema.ObjectId,
      ref: "User",
    },
  ],
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdDate: Date,
});

mongoose.model("events", eventSchema);
