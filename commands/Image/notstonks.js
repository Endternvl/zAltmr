const Color = "RANDOM";
const Discord = require("discord.js");

module.exports = {
  name: "notstonks",
  aliases: ["nstks"],
  category: "Image",
  description: "Return A Not Stonks Image!",
  usage: "Not Stonks | <Mention Or ID>",
  run: async (client, message, args) => {
    
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setImage(encodeURI(`https://vacefron.nl/api/stonks?user=${Member.user.displayAvatarURL({ format: "png" })}&notstonks=true`))
    .setTimestamp();

    return message.channel.send(Embed);
  }
};
