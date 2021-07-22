const sendError = require('../../mores/error');
const sendDone = require('../../mores/success');
const Discord = require('discord.js');
const db = require('quick.db')

module.exports = {
  name: 'setlevel',
  description: 'set a level channel to a current server.',
  usage: '<CHANNEL>',

  run: async(client, message, args) => {
    const channel =
        message.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        message.guild.channels.cache.find(
          c => c.name.toLowerCase() === message.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return sendError("Please enter a valid text channel! voice channel or category is not supported.", message.channel);
      client.data.set(`levelch_${message.guild.id}`, channel.id);
      sendDone(
        `**Done**\nLevel up logs channel was setted in ${channel}`,
        message.channel
      );
  }
}