const mongoose = require('mongoose');
const { Schema } = mongoose;

const beerSchema = new Schema({
  name: String,
  percentage: Number,
  brewery: { type: Schema.Types.ObjectId, ref: 'Brewery' },
  type: { type: Schema.Types.ObjectId, ref: 'Type' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdDate: Date,
});

mongoose.model('beers', beerSchema);
