const mongoose = require("mongoose");
const { Schema } = mongoose;

const ratingSchema = new Schema({
  // The user that rates (Event administator can rate for others)
  user: { type: Schema.Types.ObjectId, ref: "User" }, // googleId
  beer: { type: Schema.Types.ObjectId, ref: "beers" },
  event: { type: Schema.Types.ObjectId, ref: "events" },
  score: { type: Number, required: [true, "Rating requires a score"] }, // 0-100
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdDate: Date,
});

mongoose.model("ratings", ratingSchema);
