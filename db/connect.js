const mongoose = require("mongoose");


async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_URI);
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB ; 