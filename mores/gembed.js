const { MessageEmbed } = require('discord.js');

module.exports = async (text, channel) => {
  let embed = new MessageEmbed()
  .setTitle("Create A Giveaway!")
  .setDescription('🎉 - ' + text)
  .setColor("#406da2")
  .setFooter(client.user.username, client.user.displayAvatarURL())
  .setTimestamp();

  await channel.send(embed);
}