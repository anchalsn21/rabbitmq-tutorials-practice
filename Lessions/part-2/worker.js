/** IIFY + async await */ (async function (open) {
  console.log("IIFY");
  try {
    let conn = await open.connect("amqp://localhost");
    // conn.close();
    // process.exit(0);

    let channel = await conn.createChannel();
    let queue = "tasks";
    channel.assertQueue(queue, { durable: true });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(
      queue,
      function (msg) {
        var secs = msg.content.toString().split(".").length - 1;

        console.log(" [x] Received %s", msg.content.toString());
        setTimeout(function () {
          console.log(" [x] Done");
        }, secs * 2000);
      },
      {
        // automatic acknowledgment mode,
        // see ../confirms.html for details
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
