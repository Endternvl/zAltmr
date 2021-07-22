const client = require('../index')

client.snipe = new Map();
client.on("messageDelete", async (message, channel) => {
  client.snipe.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null
  });
});