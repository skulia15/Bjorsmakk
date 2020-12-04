const mongoose = require('mongoose');
const { Schema } = mongoose;

const countrySchema = new Schema({
  name: {type: String, required: [true, 'Country requires a name']},
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdDate: Date,
});

mongoose.model('countries', countrySchema);
