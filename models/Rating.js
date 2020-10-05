const mongoose = require('mongoose');
const { Schema } = mongoose;

const ratingSchema = new Schema({
  user: String, // googleId
  beer: String, // beerId
  rating: Number, // 0-100
  // brewery: String, Select from list
  // type: String, Select from list
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdDate: Date,
});

mongoose.model('ratings', ratingSchema);