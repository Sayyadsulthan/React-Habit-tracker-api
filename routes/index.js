const express = require("express");
const app = express.Router();

app.get("/", (req, res) => {
  console.log("hellow world");
  return res.status(200).json({ message: "hellow world" });
});

app.use("/api", require("./api"));

module.exports = app;
