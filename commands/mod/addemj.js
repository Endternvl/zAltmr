const Discord = require('discord.js')
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json")

module.exports = {
  name: "addemoji",
  category: "moderation",
  run: async (client, message, args) => {
    const errembed = new Discord.MessageEmbed()
          .setTitle("Error")
          .setDescription(`Oops an error occured! Please check if you used the command correctly. Possible Reasons:\n\n• Correct Usage: ${client.prefix}addemoji (emoji name) (link)\n• File cannot be larger than 256.0 kb.\n• Invalid image`)

          .setColor("RED")
    if (!message.member.hasPermission("MANAGE_EMOJIS")) {
      return message.channel.send(`:x: | **You Don't Have Enough Permission To Add Emoji! Missing Perms: \`MANAGE_EMOJIS\`**`)
    }
    let isUrl = require("is-url");
    let type = "";
    let name = "";
    let emote = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);
    if (emote) {
      emote = emote[0];
      type = "emoji";
      name = args.join(" ").replace(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi, "").trim().split(" ")[0];
    } else {
      emote = `${args.find(arg => isUrl(arg))}`
      name = args.find(arg => arg != emote);
      type = "url";
    }
    let emoji = { name: "" };
    let Link;
    if (type == "emoji") {
      emoji = Discord.Util.parseEmoji(emote);
      Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
        emoji.animated ? "gif" : "png"
        }`
    } else {
      if (!name) return message.reply(`Usage: \`${client.prefix}addemoji <name> <image or gif url or emoji>\``)
        if (name.length < 2 || name.length > 32) return message.reply(`\`\`\`Invalid Form Body
name: Must be between 2 and 32 in length.\`\`\``)
      Link = message.attachments.first() ? message.attachments.first().url : emote;
    }
    
    message.guild.emojis.create(
      `${Link}`,
      `${`${name || emoji.name}`}`
    ).then(em => message.channel.send(new MessageEmbed()
    .setTitle('Added Emoji!')
    .setDescription(`${em.toString()} This emoji: \`${name}\` has been created. From: \`${emoji.name || 'Image'}\``)
    .setFooter('Added')
    .setTimestamp(message.createdAt)
    .setColor('YELLOW'))).catch(err => {
          message.channel.send(errembed)
    })

  }
}