const express = require("express");
const router = express.Router();
const User = require("../models/User");
const multer = require("multer");
const jwt = require('jsonwebtoken')
const fetchUser = require("../middlewares/fetchuser");

require("dotenv").config();
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;

var Storage = multer.diskStorage({
    destination : './uploads/',
    filename : (req,file ,cb)=>{
      cb(null , new Date().toISOString() + file.originalname);
    }
})

var upload  = multer({
    storage : Storage 
}).single('file');



router.get('/checkproxy' , (req,res)=>{

  res.status(200).json({message:"Working"});
})

router.get("/getdetails", fetchUser, async (req, res) => {
  try {
    let user = req.user;
    if (user) {
      user = await User.findById(user.id);
      if (user) {
        console.log(user);
        return res.status(200).json({ success: true, data: user });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Failed to get details" });
      }
    } else {
      res.status(401).json({ success: false, message: "Invalid User" });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, message: "Failed to get data" });
  }
});

router.put("/updateDetails",  upload , fetchUser, (req, res) => {
  try {
    let user = req.user;
     console.log(req.file);
    const { firstname, lastname, address } = req.body;
    const userID = user.id;
    const username = firstname + " " + lastname;
    const useraddress = address;
    const url = "http://localhost:3000/";

    let userimage ;
    if(req.file){
      userimage = url + req.file.filename;
    }
    else{
      userimage = req.body.imageUrl;
    }
    
     console.log(
      firstname + " " + lastname + " " + useraddress + " " + userimage
    );

    user = User.findByIdAndUpdate(
      userID,
      { name: username, 
        address: useraddress, 
        image: userimage 
       },

      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("profile updated successfully ");
        }
      }
    );
    res
      .status(200)
      .json({ success: true, message: "User profile updated succeessfully" });
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .json({
        success: false,
        message: "Failed to update profile , try again...",
      });
  }
});

//Increase OrderCount after Successfull order
router.post("/orderCount", async (req, res) => {
  try {
    let userId;
    const authToken = req.body.userAuth;
    // console.log(authToken);
    if (!authToken) {
      res.status(401).json({ sucess: false, message: "Unvalid user" });
      return;
    }
    try {
      const data = await jwt.verify(authToken, JWT_AUTH_TOKEN);

      userId = data.user.id;
    } 
    catch (error) {
      console.log(error.message);
      res.status(401).json({
        sucess: false,
        message: " Unvalid user with wrong credentails",
      });
    }

    //  console.log(userId);
    if (userId) {
      const newCart = await User.findByIdAndUpdate(userId,{ $inc : {orderCount : 1}});
      console.log(" new cart data " );
      // newCart.then((res)=>{
      //   console.log(res);
      // })
       const user = await User.findById(userId)
       console.log(user);
      return res.status(200).json({ success: true, message: "Order Count inreased" });
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
