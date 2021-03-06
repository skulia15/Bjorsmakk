const mongoose = require("mongoose");
const { Schema } = mongoose;

const beerSchema = new Schema({
  name: {type: String, required: [true, 'Beer requires a name']},
  percentage: Number,
  brewery: { type: Schema.Types.ObjectId, ref: "breweries" },
  type: [{ type: Schema.Types.ObjectId, ref: "types" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "users" },
  createdDate: Date,
});

mongoose.model("beers", beerSchema);