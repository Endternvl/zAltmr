const Discord = require("discord.js");
const db = require('quick.db');
const sendError = require('../../mores/error')
module.exports = {
  name: "customcommands",
  aliases: ['cc-list'],
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
    embed.setTitle(`Custom Commands`);
    embed.setThumbnail(message.guild.iconURL());
    embed.setFooter(message.author.tag, message.author.displayAvatarURL());
    embed.setColor("GREEN");
    let words = db.get(`cmd_${message.guild.id}`);
    if (words && words.length) {
      let array = [];
      words.forEach(x => {
        array.push(`**Name:** \`${x.name}\``);
      });

      embed.setDescription(`${array.join("\n")}`);
      embed.setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );
    } else {
      return sendError("**No Custom Commands In This Guild!**", message.channel);
    }

    return message.channel.send({ embed: embed });
  }
};