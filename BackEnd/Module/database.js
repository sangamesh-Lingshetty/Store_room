const mongoose = require("mongoose");
require("dotenv").config();


const connectDB = async () => {
  try {
    const url = process.env.MongoDB_Local_URL;
    
    mongoose.connect(url, {
    });
    console.log("MongoDB database connected");
    
  } catch (erorr) {
    console.log("Error from database.js",erorr);
    process.exit(1);
  }
};

module.exports = connectDB;
