const express = require("express");
const app = express();

app.use("/user", require("./user"));


module.exports = app;
