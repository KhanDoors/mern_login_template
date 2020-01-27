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

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connected"))
  .catch(err => console.log("Connection Error: ", err));

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
