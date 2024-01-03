const { default: mongoose } = require("mongoose");

//Function to invoke connection to MongoDB
const connectToMongoDb = () => {
  mongoose.connect(process.env.MONGODB_URL);
  const connection = mongoose.connection;
  connection.on("error", (error) => {
    console.log("error", error);
  });
  connection.once("open", () => {
    console.log("connected to db");
  });
};
module.exports = { connectToMongoDb };
