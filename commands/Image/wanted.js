const canvacord = require ("canvacord")
const { MessageAttachment, MessageEmbed } = require('discord.js');
module.exports= {
  name:"wanted",
  description:"wanted someone",
  category:"Image",
run: async (client, message, args) => {
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let faceplam = await canvacord.Canvas.wanted(user.displayAvatarURL({ format: "png", dynamic: true }));
        let attachment = new MessageAttachment(faceplam, "wanted.png")
        return message.channel.send(attachment);
}

}