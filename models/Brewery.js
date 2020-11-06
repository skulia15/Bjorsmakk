const mongoose = require('mongoose');
const { Schema } = mongoose;

const brewerySchema = new Schema({
  name: String,
  country: { type: Schema.Types.ObjectId, ref: "breweries" },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdDate: Date,
});

mongoose.model('breweries', brewerySchema);
