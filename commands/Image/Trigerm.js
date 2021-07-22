const canvacord = require ("canvacord")
const { MessageAttachment, MessageEmbed } = require('discord.js');
module.exports= {
  name:"triggered",
  description:"trigger some one",
  category:"Image",
  aliases: ["tg"],
run: async (client, message, args) => {
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let faceplam = await canvacord.Canvas.trigger(user.displayAvatarURL({ format: "png", dynamic: true }));
        let attachment = new MessageAttachment(faceplam, "triggered.gif")
        return message.channel.send(attachment);
}

}