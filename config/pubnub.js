const PubNub = require("pubnub");

const pubnub = new PubNub({
  publishKey: "pub-c-8fb1fc55-4e67-43c8-8138-d2e3449e6f2f",
  subscribeKey: "sub-c-7ad5e7ab-5eaa-4095-a89c-08a4d211b887",
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
