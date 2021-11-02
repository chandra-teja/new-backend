const express = require("express");
const router = express.Router();
const User = require("../models/User");
const multer = require("multer");

const fetchUser = require("../middlewares/fetchuser");

require("dotenv").config();





router.get('/getdetails' , fetchUser  , async(req,res)=>{

    try{

        let user = req.user ;

        if(user){
            user = await User.findById(user.id);

            if(user){
                // console.log(user);
               return res.status(200).json({success:true , data : user});
            }
            else{
               return res.status(401).json({success:false , message:"Failed to get details"});
            }
        }
        else{
            res.status(401).json({success:false , message: "Invalid User"});
        }
    }
    catch(err){
            console.log(err);
            res.status(401).json({success:false , message : "Failed to get data"});
    }
})

router.put('/updateDetails'  , fetchUser , (req,res)=>{

try{
    let user = req.user ;
    const {firstname , lastname , address, image} = req.body ;
    const userID = user.id ;
    const username = firstname + " "+lastname ;
    const useraddress = address;
    const userimage = image;
    // console.log(userID);
    console.log(firstname+" "+lastname + " " + useraddress + " " + userimage);

    user = User.findByIdAndUpdate(userID , {name : username , address : useraddress , image : userimage} , function(err,docs){

        if(err){
            console.log(err);

        }
        else{
            console.log("prfile updated successfully ");
        }

    }) ;
    res.status(200).json({success : true , message : "User profile updated succeessfully"}) ;

}
catch(err){
    console.log(err) ;
    res.status(401).json({success: false , message : "Failed to update profile , try again"}) ;
}


})

module.exports = router ;