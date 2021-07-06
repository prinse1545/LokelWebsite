// Copyright (C) 2020-2021 Philipp Rajah Moura Srivastava  <philipp.msrivastava@gmail.com>
//
// This file is part of LokelAPI.
//
// any part of LokelAPI can not be copied and/or distributed without the expressed
// permission of Philipp Rajah Moura Srivastava
//
// 2021-07-06
// Filename: index.js
// Description: This file serves as the entrypoint
// to the LokelWebsite
//
// Lokel Co.

//Importing tools
const express = require("express");
const path = require("path");

// Initializing app
const app = express();


// Starting app 
app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://lokel.xyz");
  res.sendFile(path.join(__dirname, "index.html"));
});

// Listening
app.listen(80, () => {
  console.log("Listening on port 80");
});
