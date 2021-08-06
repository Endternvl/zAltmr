const client = require('../index');


client.on("messageDelete", async (message, channel) => {
  let snipes = client.snipe.get(message.channel) || [];
  
  snipes.unshift({
    msg: message,
    image: message.attachments.first()?.proxyURL || null,
    time: Date.now(),
  });

  client.snipe.set(message.channel, snipes);
});