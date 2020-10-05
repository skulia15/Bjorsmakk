const mongoose = require('mongoose');
const { Schema } = mongoose;

const typeSchema = new Schema({
  typeName: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdDate: Date,
});

mongoose.model('types', typeSchema);
