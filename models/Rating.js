const mongoose = require('mongoose');
const { Schema } = mongoose;

const ratingSchema = new Schema({
  user: String, // googleId
  beer: String, // beerId
  rating: Number, // 0-100
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdDate: Date,
});

mongoose.model('ratings', ratingSchema);