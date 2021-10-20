
// ponse, json } = require('express');
const express  = require('express');
const router = express.Router() ;
const https= require("https");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const axios = require('axios');

require("dotenv").config(); 


// Enviourment variables

const API_KEY = process.env.API_KEY ;
const HOST_NAME = process.env.HOST_NAME;
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
// const HOST_NAME = process.env.HOST_NAME;



router.post("/login/sendOTP", async (req, res) => {
  // console.log("request came")
  const phonenumber = req.body.number;
  console.log(phonenumber);
  
  const reqUrl = `https://${HOST_NAME}/API/V1/${API_KEY}/SMS/${phonenumber}/AUTOGEN`;
   try{
       const responsedata = await axios.get(reqUrl); 
      //  console.log(responsedata);
       const response =  responsedata.data;
       console.log(response);
       if(response.Status === 'Success'){
           return  res.status(200).json({success : true , message : "OTP sent successfully" , sessionId : response.Details}) ;
       }
       else if(response.Status === 'Error'){
         console.log(error);
        return res.status(401).json({success : false , message : "Failed to send OTP , try again"});
       }

   }
   catch(error){
     console.log(error.message); 
     res.status(401).json({success : false , message : "failed to send otp , please try agian"});
   }

 
});

router.post('/login/verify',async (req,res)=>{

    const OTP = req.body.OTP ;
    const sessionId = req.body.sessionId ;
    const phonenumber = req.body.phonenumber;

    // let verfiedToken = "";
    // console.log(resdata.Details);
    const reqURL =  `https://${HOST_NAME}/API/V1/${API_KEY}/SMS/VERIFY/${sessionId}/${OTP}`;
    // console.log(OTP + " "+ sessionId + " "+phonenumber);
  try{
    const responsedata = await axios.get(reqURL); ;
    const response = await responsedata.data;
  //  console.log(response);
    if(response.Status === 'Success' && response.Details === "OTP Expired"){
       return res.status(401).json({success : false , message : "OTP expired , try again"});

    }
    else if(response.Status === 'Error'){
      return res.status(401).json({success : false , message : " Wrong OTP  , try again"});

    }
    else{
            let user = await User.findOne({mobileNumber : phonenumber});
            if(!user){
              user = await User.create({
                mobileNumber: phonenumber,
                address: " ",
                orderCount: 0,
                image : " ",
                logout : false
              });
            }

            const data = {
            user :{
                id: user.id,
            }
           };

            const authToken = jwt.sign(data ,JWT_AUTH_TOKEN );
            

            res
              .status(200)
              .json({success : true , message : "Device verified" , AuthToken :authToken});
            

          
            }
          }
          catch(error){
            console.error(error);
            res.status(404).json({success:false , message : "User is Not verified"});
          }
      


});

// verification middleware 

async function authenticateUser(req,res,next){

  const authToken = req.header.authToken ;
  jwt.verify(authToken , JWT_AUTH_TOKEN ,async(err,user)=>{
    if(user){
        req.user = user;
        next();
    }
    else if(err.message = "TokenExpiredError"){
      res.status(404).json({success :false , message : "Access Denied , login again !!! "})
    }
    else{
      console.error(err);
      res.status(404).json({ sucess : false , err , message : "User is not Authenticated"});
    }
  })
}







// Logout route 

router.get('/logout' , (req,res)=>{
  res.clearCookie('refreshToken')
  .clearCookie('authToken')
  .json({message :"User logged out successfully"})
})

module.exports = router ;
