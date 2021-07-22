const Color = "RANDOM", Discord = require("discord.js");
const db = require('quick.db')
const { default_prefix } = require('../../config.json')

module.exports = {
  name: "qr",
  aliases: ["qrcode"],
  category: "fun",
  description: "Return A Qr Image!",
  usage: "Qr <Message>",
  run: async (client, message, args) => {
    console.log(`Used in ${message.guild.name}`)

    let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;
    
    const Msg = args.join("+");
    if (!Msg) return message.channel.send(`Please Give Your Message! **__EX:__** \`${prefix}qr Hello, i'm @${message.author.username}\``);



    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setImage(encodeURI(`https://chart.googleapis.com/chart?chl=${Msg}&chs=200x200&cht=qr&chld=H%7C0`))
    .setTimestamp();
    message.delete()

    return message.channel.send(Embed);
  }
};