const mongoose = require('mongoose');
const { Schema } = mongoose;

const countrySchema = new Schema({
  name: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdDate: Date,
});

mongoose.model('countries', countrySchema);
