const express = require("express");
const port = 8000;
const app = express();
const passport = require("passport");
const db = require("./config/database");

app.get("/", (req, res) => {
  console.log("hellow world");
  return res.status(200).json({ message: "hellow world" });
});

app.listen(port, (err) => {
  if (err) {
    return console.error("Error in server  listening :", err);
  }

  console.log("server running on port :", port);
});
