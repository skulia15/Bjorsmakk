const mongoose = require('mongoose');
const { Schema } = mongoose;

const brewerySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Brewery requires a name']
  },
  country: { type: Schema.Types.ObjectId, ref: "countries" },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdDate: Date,
});

mongoose.model('breweries', brewerySchema);
