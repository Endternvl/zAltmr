const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
module.exports = {
  name: "up",
  aliases: ["online", "uptime", "ontime"],
  category: "info",
  description: "Shows Bot's Up time.",
  usage: "uptime",

  run: async (client, message, args) => {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;

    const embed = new Discord.MessageEmbed()
    .setTitle("Up Time")
    .setDescription("How Long I'm Up? You Will Know Now")
    .addField("**__UPTIME:__**", `\`${days}d\`-\`${hours}h\`-\`${minutes}m\`-\`${seconds}s\``)
    .setColor("BLUE")
    .setFooter(`© ${client.user.username}`)
    .setTimestamp();
    
    return message.channel.send(embed);
  }
  
}