const Discord = require('discord.js');
const DIG = require("discord-image-generation");

module.exports = {
  name: "rip",
  category: "Image",
  description: "rip u :(",
  run: async (client, message, args) => {
  let user = message.mentions.users.first() || message.author;
let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        // Make the image
        let img = await new DIG.Rip().getImage(avatar)
        // Add the image as an attachement
        let attach = new Discord.MessageAttachment(img, "oof-you.png");;
        message.channel.send(attach)
}
}