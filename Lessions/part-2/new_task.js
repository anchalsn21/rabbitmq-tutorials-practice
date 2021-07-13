/** IIFY + async await */ (async function (open) {
  console.log("IIFY");
  try {
    // Try block starts here
    let conn = await open.connect("amqp://localhost");

    let channel = await conn.createChannel();
    let queue = "tasks";
    let message = process.argv.slice(2).join(" ");
    console.log(message);
    await channel.assertQueue(queue, { durable: true });

    await channel.sendToQueue(queue, Buffer.from(message), {
      persistent: true,
    });

    console.log("send message successfully  " + message);

    /// Try Block ends here
  } catch (error) {
    console.log("Something went wrong", error);
  }
})(require("amqplib"));
