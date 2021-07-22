const Discord = require("discord.js");
const sendError = require('../../mores/error');
module.exports = {
name: "colorify",
run: async (client, message, args) => {
let pinged = message.mentions.users.first();
let color = args[1];
if(!pinged){
  pinged = message.author;
  color = args[0];
};
if(!color) return sendError(`Please provide the name of the color with which you want to color the avatar! Example: \`${client.prefix}colorify @usermention color\` or \`${client.prefix}colorify color\``, message.channel)
let av = pinged.displayAvatarURL({ dynamic: false, format: "png" })
let image = `https://api.popcatdev.repl.co/colorify?image=${av}&color=${color}`
let em = new Discord.MessageEmbed()
.setTitle("Colored Picture Of " + pinged.username)
.setImage(image)
.setColor(color.toUpperCase())
.setFooter("If the color shown is just grey, it means it is not supported.")

message.channel.send(em).catch((err) => {
  return sendError(`OOPS! SOMETHING WENT WRONG! \n \`\`\`${err}\`\`\``, message.channel)
})
}
}