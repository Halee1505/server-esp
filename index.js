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

// const server = http.createServer(app);

// const PORT = process.env.PORT || 2222;

// server.listen(PORT, () => {
//   console.log(`Server running at port ${PORT}`);
// });

app.get("/", (req, res) => {
  res.send({
    message: "Hello from serverless function!",
    code: 200,
  });
});
// app.get("/open", (req, res) => {
//   const channel = "client";
//   const message = "on";
//   pubnub.publish({ channel, message }, (status, response) => {
//     if (status.error) {
//       console.error(status);
//     }
//   });
//   res.send("trunk open!");
// });
// app.get("/close", (req, res) => {
//   const channel = "client";
//   const message = "off";
//   pubnub.publish({ channel, message }, (status, response) => {
//     if (status.error) {
//       console.error(status);
//     }
//   });
//   res.send("trunk closed!");
// });

// app.get("/start", (req, res) => {
//   const channel = "client";
//   const message = "start";
//   pubnub.publish({ channel, message }, (status, response) => {
//     if (status.error) {
//       console.error(status);
//     }
//   });
//   res.send("start car!");
// });
// app.get("/fail", (req, res) => {
//   const channel = "client";
//   const message = "fail";
//   pubnub.publish({ channel, message }, (status, response) => {
//     if (status.error) {
//       console.error(status);
//     }
//   });
//   res.send("start car fail!");
// });
// app.get("/stop", (req, res) => {
//   const channel = "client";
//   const message = "stop";
//   pubnub.publish({ channel, message }, (status, response) => {
//     if (status.error) {
//       console.error(status);
//     }
//   });
//   res.send("stop car!");
// });

module.exports = serverless(app);
