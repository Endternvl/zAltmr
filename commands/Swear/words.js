const Discord = require("discord.js");
const db = require('quick.db');
const sendError = require('../../mores/error')
module.exports = {
  name: "words",
  description: 'view banned words on guild',

  bot: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "MANAGE_ROLES"
  ],
  permissions: ["VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "MANAGE_ROLES"],
  category: "anti-swear",
  run: async (client, message, args) => {
    let embed = new Discord.MessageEmbed();
    embed.setTitle(`${message.guild.name} | Banned Words`);
    embed.setThumbnail(message.guild.iconURL());
    embed.setFooter(message.author.tag, message.author.displayAvatarURL());
    embed.setColor("GREEN");
    let words = db.get(`words_${message.guild.id}`);
    if (words && words.length) {
      let array = [];
      words.forEach(x => {
        array.push(`**Word:** ||\`${x.word}\`|| | **Added By:** ${x.author}`);
      });

      embed.setDescription(`${array.join("\n")}`);
      embed.setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );
    } else {
      return sendError("**No Banned Words In This Guild!**", message.channel);
    }

    return message.channel.send({ embed: embed });
  }
};