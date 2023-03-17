const PubNub = require("pubnub");

const pubnub = new PubNub({
  publishKey: process.env.PUBNUB_PUBLISH_KEY,
  subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY,
  userId: "halee-1505",
});

pubnub.subscribe({
  channels: ["connect-server"],
});

pubnub.addListener({
  message: function (message) {
    console.log("New Message!!", message);
    const channel = "connect-client";
    const ms = "Connected from Nodejs";
    pubnub.publish({ channel, message: ms }, (status, response) => {
      console.log("Publishing message", status, response);
    });
  },
});
