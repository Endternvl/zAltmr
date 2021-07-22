const { formatDate } = require("../../func2");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "youngest",
  category: "info",
  description: "Get the youngest account creation date in the guild!",
  usage: "youngest",
  run: async (bot, message, args) => {
    let mem = message.guild.members.cache
      .filter((m) => !m.user.bot)
      .sort((a, b) => b.user.createdAt - a.user.createdAt)
      .first();
    const Embed = new MessageEmbed()
      .setTitle(`The youngest member in ${message.guild.name}`)
      .setColor(`RANDOM`)
      .setFooter(`Date format: MM/DD/YYYY`)
      .setDescription(
        `${mem.user.tag} is the youngest user in ${
          message.guild.name
        }! Account creation date: ${formatDate(mem.user.createdAt)}`
      );
    message.channel.send(Embed);
  },
};