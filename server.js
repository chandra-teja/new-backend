require('dotenv').config();
const express = require('express');
const connectTomongo = require('./db.js');
const app =  express();
const port = process.env.PORT || 5000 ;
require('./prod')(app);
const cors = require('cors');
const cookieParser = require("cookie-parser");

 // Your Auth Token from www.twilio.com/console
app.use(cors({ origin: "http://localhost:3000/" , credentials : true}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',require('./routes/authOTP'));
app.use('/api/Cart' , require('./routes/Cart'));
app.use('/api/update' , require('./routes/userUpdate'));

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
    res.header("Access-Control-Allow-Headers" , "Origin,X-Requested-With , Content-Type ,Accept");
    next();
});
    
 connectTomongo();
app.get('/',(req,res)=>{
    res.send("<h1>Hello Licious lite</h1>");
})



app.listen(port ,()=>{
    console.log(`Server is running on port ${port}`);
})

