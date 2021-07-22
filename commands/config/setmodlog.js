const sendError = require('../../mores/error');
const sendDone = require('../../mores/success');

module.exports = {
  name: 'setmodlog',
  description: 'set a modlog channel to a current server.',
  usage: '<CHANNEL>',

  run: async(client, message, args) => {
    const channel =
        message.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        message.guild.channels.cache.find(
          c => c.name.toLowerCase() === message.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return sendError("Please enter a valid text channel", message.channel);
      client.data.set(`modlog_${message.guild.id}`, channel.id);
      sendDone(
        `**Done**\nModeration logs channel was setted in ${channel}`,
        message.channel
      );
  }
}