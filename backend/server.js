const express = require("express");
const fs = require("fs");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

//db connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error from MongoDB: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//route middleware
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);
// app.use("/api", router);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
