require("dotenv").config();
const mongoose = require("mongoose");

const mongoURI = process.env.url;

const mongodbconnect = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connect to mongodb successfully");
  });
};

module.exports = mongodbconnect;
