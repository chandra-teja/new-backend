const express = require('express');
const fetchUser = require('../middlewares/fetchuser');
const User  = require('../models/User');
const Cart = require("../models/Cart");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN ;

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

 
  try{

  const userId = req.user.id;

  
   if(userId){
    const cart =  await Cart.create({
      user : userId,
      name :req.body.name,
      amount:req.body.amount
    }); 
    // console.log(cart);
   return res.status(200).json({ success: true, message: "item added successfully" });
  }
  else{
    return res.status(401).json({success:false , message :  "Unvalid user"});
    }
  }
  catch(err){
    console.log(err);
    res.status(401).json({sucess:false , err , message:"Internal error"})
  }
  
  
})

router.put('/deleteItem'  , async(req,res) =>{
    try{

     
      let userId ;
      let itemId = req.body.itemID ;
      const authToken = req.header("authToken");
    
    if (!authToken) {
      res.status(401).json({ sucess: false, message: "Unvalid user" });
      return ;
    }
    try {
      const data = await jwt.verify(authToken, JWT_AUTH_TOKEN);
      // console.log(data);
     userId= data.user.id;
      
    } catch (error) {
      console.log(error.message);
      res.status(401).json({
        sucess: false,
        message: " Unvalid user with wrong credentails",
      });
    }

    // console.log(userId);
     if(userId){
    
     
      let itemdetails = await Cart.findById(itemId);
     
      if(!itemdetails){
        res.status(403).json({success : false , message: " Item not found"});
        return ;
      }
   
      if(itemdetails && itemdetails.user.toString() !== userId){
        res.status(403).json({success:false , message : "Not allowed"});
        return;
      }
      
      itemdetails  = await Cart.findByIdAndDelete(itemId);
 
       res.status(200).json({success:true  , message:"Item deleted"});
    }
    }
    catch(err){
      
      console.log(err.message);
    }
})

module.exports = router ;