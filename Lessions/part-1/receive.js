/** IIFY + async await */ (async function (open) {
  console.log("IIFY");
  try {
    let conn = await open.connect("amqp://localhost");

    let channel = await conn.createChannel();
    let queue = "test";
    channel.assertQueue(queue, { durable: false });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(
      queue,
      function (msg) {
        console.log(" [x] Received %s", msg.content.toString());
      },
      {
        noAck: true,
      }
    );

    // let msg = await channel.consume(queue);
    // console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    // console.log("receiveed message: ", { msg: msg.content.toString() });
  } catch (error) {
    console.log("Something went wrong", error);
  }
})(require("amqplib"));

/** Callback example */
// var amqp = require("amqplib/callback_api");
// amqp.connect("amqp://localhost", function (error0, connection) {
//   if (error0) {
//     throw error0;
//   }
//   connection.createChannel(function (error1, channel) {
//     if (error1) {
//       throw error1;
//     }
//     var queue = "test";

//     channel.assertQueue(queue, {
//       durable: false,
//     });

//     console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
//     channel.consume(
//       queue,
//       function (msg) {
//         console.log(" [x] Received %s", msg.content.toString());
//       },
//       {
//         noAck: true,
//       }
//     );
//   });
// });
