const mongoose = require("mongoose");
const { Schema } = mongoose;
const CartSchema = new Schema({
  
    user : {
        type : mongoose.Schema.Types.ObjectId 
    } ,
    name : { 
        type: String , 
        required : true},

    amount : {
        type:Number ,
        required:true}

});

const Cart = mongoose.model("cart", CartSchema);
module.exports = Cart;
