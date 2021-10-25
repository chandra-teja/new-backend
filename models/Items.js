const mongoose = require("mongoose");
const { Schema } = mongoose;
const ItemSchema = new Schema({
    itemId : {type : String},
  title: { type: String, required: true, unique: true },

  price: { type: Number, required: true },

  weight : {type : Number, required : true},

  description: { type: String },

  image: { type: String }
});

const Item = mongoose.model("item", ItemSchema);
module.exports = Item;
