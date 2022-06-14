const { default: mongoose } = require("mongoose");

const connectDB = (url) => {
  console.log("database is connected...");
  return mongoose.connect(url);
};

module.exports = connectDB;
