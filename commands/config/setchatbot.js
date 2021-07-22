const sendd = require('../../mores/success');
const sendr = require('../../mores/error');
const Discord = require('discord.js');

module.exports = {
  name: 'setchatbot',
  description: 'set an AI chatbot channel',
  usage: '<channel>',
  aliases: ['setchatbotchannel'],

  run: async (client,message,args) => {
    let content = await client.awaitReply(
        message,
        `Please enter a channel for a chat bot channel!\nType \`cancel\` if you want to cancel this setup`,
        180000,
        true
      );
      if (!content)
        return sendr("No response was given, Setup canceled.", message.channel);

      if (content.content.toLocaleLowerCase() === "cancel")
        return sendd("Setup canceled.");
      const channel =
        content.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        content.guild.channels.cache.find(
          c => c.name.toLowerCase() === content.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return sendError("Please Enter A Valid Text Channel!",message.channel);
      client.chatbots.set(`chatbot_${message.guild.id}`, channel.id);
      client.send(
        `**Done**\nChat-bot channel has been setted as ${channel}`,
        message
      );
  }
}