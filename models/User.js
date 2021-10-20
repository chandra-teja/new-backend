const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema = new Schema({
  name: { type: String },

  mobileNumber: { type: Number, required: true, unique: true },

  address: { type: String },

  image: {  type: String },

  orderCount: { type: Number },
  
  logout: { type: Boolean },

});

const User = mongoose.model('user',UserSchema);
module.exports = User ;