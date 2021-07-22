const sendError = require('../../mores/error');

module.exports = {
  name: 'setwelcome',
  description: 'set a welcome channel to a current server.',
  usage: '<CHANNEL>',

  run: async(client, message, args) => {
    const channel =
        message.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        message.guild.channels.cache.find(
          c => c.name.toLowerCase() === message.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return sendError("Please Enter A Valid Text Channel!", message.channel);
      client.data.set(`welchannel_${message.guild.id}`, channel.id);
      client.send(
        `**Done**\nwelcome message channel has been setted in ${channel}`,
        message
      );
  }
}