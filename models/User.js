const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    googleId: String,
    image: String
});

mongoose.model('users', userSchema);
