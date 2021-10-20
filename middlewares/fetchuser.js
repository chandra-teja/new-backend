const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN ;

const fetchUser = async(req,res,next)=>{
    
    const authToken = req.header('authToken') ;
    //  console.log(" auth token " + authToken);
    if(!authToken){
        res.status(401).json({sucess :false , message :"Unvalid user"});
    }
    try{
    const data =  await jwt.verify(req.header('authToken') , JWT_AUTH_TOKEN);
    // console.log(data);
    req.user = data.user ;
    next();
    
    }
    catch(error){
        console.log(error);
        res.status(401).json({
            sucess: false,
            message: " Unvalid user with wrong credentails",
          });
       
    }

}

module.exports = fetchUser ;