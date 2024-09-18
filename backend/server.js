const express = require("express");
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const app = express();

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
