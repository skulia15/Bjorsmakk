const mongoose = require("mongoose");
const { Schema } = mongoose;

const beerSchema = new Schema({
  name: String,
  percentage: Number,
  brewery: { type: Schema.Types.ObjectId, ref: "breweries" },
  type: [{ type: Schema.Types.ObjectId, ref: "types" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdDate: Date,
});

mongoose.model("beers", beerSchema);
