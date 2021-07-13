/** IIFY + async await */ (async function (open) {
  console.log("IIFY");
  try {
    let conn = await open.connect("amqp://localhost");

    let channel = await conn.createChannel();
    let queue = "test";
    // console.log(process.argv.slice(2).join(" "));
    let message = process.argv.slice(2).join(" ");
    console.log(message);
    await channel.assertQueue(queue, { durable: false });

    await channel.sendToQueue(queue, Buffer.from(message));
    console.log("send message ", { sentMsg: message });
  } catch (error) {
    console.log("Something went wrong", error);
  }
})(require("amqplib"));

/** Callback Example */
// const amqp = require("amqplib/callback_api");

// amqp.connect("amqp://localhost", function (error0, connection) {
//   if (error0) {
//     throw error0;
//   }
//   console.log("connected");
//   connection.createChannel(function (error1, channel) {
//     if (error1) {
//       console.log(error1);
//       throw error1;
//     }

//     let queue = "test";
//     let msg = "Testing Rabbit MQ";

//     channel.assertQueue(queue, {
//       durable: false,
//     });

//     channel.sendToQueue(queue, Buffer.from(msg));
//     console.log(" [x] Sent %s", { msg });
//   });

//   setTimeout(function () {
//     connection.close();
//     process.exit(0);
//   }, 500);
// });
