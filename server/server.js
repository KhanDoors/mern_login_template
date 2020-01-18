const express = require("express");

const app = express();

app.get("/api/signup", (req, res) => {
  res.json({ data: "you hit the endpoint" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
