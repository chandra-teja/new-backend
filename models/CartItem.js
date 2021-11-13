const mongoose = require("mongoose");
const { Schema } = mongoose;
const CartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default : 1,
    min :1
  },
});

const cartItem = mongoose.model("cart", CartSchema);
module.exports = cartItem;
