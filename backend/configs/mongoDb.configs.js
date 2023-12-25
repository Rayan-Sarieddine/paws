const { default: mongoose } = require("mongoose");

const connectToMongoDb = () => {
  mongoose.connect(process.env.MONGODB_URL);
  const connection = mongoose.connection;
  connection.on("error", (error) => {
    console.log("error", error);
  });
  connection.once("open", () => {
    console.log("connected to mongodb");
  });
};
module.exports = { connectToMongoDb };
