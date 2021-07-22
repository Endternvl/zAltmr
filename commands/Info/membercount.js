const discord = require("discord.js");

module.exports = {
  name: "membercount",
  category: "info",
  description: "View how much members you have",
  run: async (client, message, args) => {
    const calcembed = new discord.MessageEmbed()
    .setDescription('Calculating / Viewing...')
    .setColor('GREEN')

    const msg = await message.channel.send(calcembed)
    
    let embed = new discord.MessageEmbed()
    .setDescription(
    `
❯ Total Members - ${message.guild.memberCount}
❯ Humans - ${message.guild.members.cache.filter(m => !m.user.bot).size}
❯ Bots - ${message.guild.members.cache.filter(m => m.user.bot).size}`)
    .setColor("RANDOM")
    .setTimestamp(message.timestamp = Date.now())

    msg.delete()
    message.channel.send(embed);
  }
}