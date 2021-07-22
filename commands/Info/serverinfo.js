const { Client, Message, MessageEmbed } = require('discord.js');
const moment = require('moment')
module.exports = {
	name: 'serverinfo',
	description: "Send You The Information Abot Server",
  category: 'info',
	run: async(client, message, args) => {
    const guild = message.guild;
    let embed = new MessageEmbed()
    .setTitle(`About ${message.guild.name}`)
    .setThumbnail(message.guild.iconURL())
    .setColor("YELLOW")
    .addField("ℹ General Information", [
    `ID: ${guild.id}`,
    `Name: ${guild.name}`,
    `Owner: ${guild.owner}`,
    ``
    ])
    .addField('Counts', [
      `Roles: ${guild.roles.cache.size}`,
      `Channels: ${guild.channels.cache.size}`,
      `Emojis: ${guild.emojis.cache.size} (Regular: ${guild.emojis.cache.filter((e) => !e.animated).size}, Animated: ${guild.emojis.cache.filter((e) => e.animated).size})`
    ])
    .addField("Additional Informations", [
      `Created: ${moment(guild.createdTimestamp).format('LT')} ${moment(guild.createdTimestamp).format('LL')} | ${moment(guild.createdTimestamp).fromNow()}`,
      `Region: ${guild.region}`,
      `Boost Tier: ${guild.premiumTier ? `Tier: ${guild.premiumTier}`: `None`}`
    ]);
    message.reply(embed)
	}
}