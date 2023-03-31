const serverless = require("serverless-http");
const express = require("express");
const http = require("http");
const cors = require("cors");
const pubnub = require("./config/pubnub");
require("dotenv").config();
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

const server = http.createServer(app);

const PORT = process.env.PORT || 2222;

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello Wor121sld!");
});
app.get("/cc", (req, res) => {
  res.send("cc!");
});
// app.get("/connect", (req, res) => {
//   const channel = "connect-client";
//   const message = "Connected from React Native";
//   pubnub.publish({ channel, message }, (status, response) => {
//     if (status.error) {
//       console.error(status);
//     } else {
//       console.log("Sent message to PubNub", response);
//     }
//   });
//   res.send("Connected to PubNub");
// });
module.exports = serverless(app);
