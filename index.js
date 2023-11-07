const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./config/db");
const { moviesRouter } = require("./routes/routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/movies", moviesRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB!");
  } catch (error) {
    console.log(error);
    console.log("Not able to connect to DB!");
  }
  console.log(`Server running on Port ${process.env.PORT}`);
});
