const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((con) => {
      console.log("MongoDB connected to host: " + con.connection.host);
    })
    .catch((err) => {
      console.error("MongoDB connection error: ", err);
      process.exit(1); // Exit the process with failure
    });
};

module.exports = connectDatabase;
