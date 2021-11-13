const express = require('express');
const connectTomongo = require('./db.js');
const app =  express();
const path = require('path');
const port = process.env.PORT || 3000 ;
require('./prod')(app);
const cors = require('cors');
const cookieParser = require("cookie-parser");


require("dotenv").config();

app.use(cors({ 
    origin: "*",
}));

app.use(express.json());
app.use(cookieParser());

app.use( express.static(path.join(__dirname , 'uploads')));

app.use('/api/auth',require('./routes/authOTP'));
app.use('/api/Cart' , require('./routes/Cart'));
app.use('/api/update' , require('./routes/userUpdate'));
app.use('/api/items',require('./routes/Items'));


    
connectTomongo();
app.get('/',(req,res)=>{
    res.send(
      `<div><h1>Hello Licious lite  </h1> sjs <img  src = "/myimage.png"/> </div>`
    );
})



app.listen(port ,()=>{
    console.log(`Server is running on port ${port}`);
})

