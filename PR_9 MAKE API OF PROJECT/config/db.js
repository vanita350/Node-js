const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://apiofproject:api123@cluster0.fjwfiza.mongodb.net/projectApiNew?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB Atlas Connected");
  })
  .catch((err) => {
    console.log(" Database Error:", err);
  });

module.exports = mongoose.connection;
