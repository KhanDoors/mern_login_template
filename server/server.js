const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

//Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(cors());
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//import routes
const authRoutes = require("./routes/auth");

// middleware
app.use("/api", authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
