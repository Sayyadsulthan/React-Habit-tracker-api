const express = require("express");
const app = express.Router();

app.use("/user", require("./user"));


module.exports = app;
