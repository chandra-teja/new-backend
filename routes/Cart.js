const express = require('express');
const fetchUser = require('../middlewares/fetchuser');
const User  = require('../models/User');
const Cart = require("../models/Cart");

const router = express.Router();


// Get cart items using get post request by individual user

router.get('/getCartItems' , fetchUser , async(req,res)=>{

try{
    const userId  =  req.user.id ;
    const items = await Cart.find({user : userId});
    res.status(200).json(items);
 }
 catch(error){
     res.status(401).json({success : false , message : "Failed"});
 }

}) 


// update order count ;
router.post('/updateOrder' , fetchUser , async(req, res) => {

  //  console.log("in update order");
  try{

  const userId = req.user.id;
  const userdetails = await User.findById(userId);
  // console.log(userdetails);

  

    const cart =  await Cart.create({
      user : userId,
      name :req.body.name,
      amount:req.body.amount
    }); 
    // console.log(cart);
    res.status(200).json({ success: true, message: "item added successfully" });
  }
  catch(err){
    console.log(err);
    res.status(401).json({sucess:false , err , message:"Internal error"})
  }
  
  
})

router.put('/deleteItem/:id' , fetchUser , async(req,res) =>{
    try{
      
    const userId = req.user.id ;
    // console.log(userId);
     if(userId){
      let itemdetails = await Cart.findById(req.params.id);

      if(!itemdetails){
        res.status(403).json({success : false , message: " Item not found"});
        return ;
      }

      if(itemdetails && itemdetails.user.toString() !== userId){
        res.status(403).json({success:false , message : "Not allowed"});
        return;
      }

      itemdetails  = await Cart.findByIdAndDelete(req.params.id);

       res.status(200).json({success:true  , message:"Item deleted"});
    }
    }
    catch(err){
      
      console.log(err);
    }
})

module.exports = router ;