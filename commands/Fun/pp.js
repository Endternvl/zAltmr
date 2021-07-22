const Discord = require("discord.js");
module.exports = {
  name: "pepe",
  description: "Get your pp size!",
  cooldown: 3,
  usage: ">pepe",
  category: "fun",
  aliases: ["pp"],
  execute: async (message, args) => {
const pp1 = [
    "=",
    "==",
    "===",
    "====",
    "=====",
    "======", 
    "=======", 
    "========"
    ];
    const randompp = pp1[Math.floor(Math.random() * pp1.length)]; 
    const user = message.author;
    const ppembed = new Discord.MessageEmbed()
      .setTitle(`${user.tag} pp`) 
      .setColor("RANDOM")
      .setDescription(`${randompp}`);
    message.channel.send(ppembed);     
  },
};
