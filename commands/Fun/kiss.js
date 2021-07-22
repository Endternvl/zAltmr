const discord = require("discord.js");
const random = require("easyfunjs").Img

module.exports = {
  name: "kiss",
  category: "fun",
  description: "Kiss someone",
  run: async (client, message, args) => {
    
    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
    let data = await random.getAnimeImgURL("kiss");

    let reason = args.slice(0).join(" ");

    if(!target){
      return message.reply("Who Will U Kiss? 💗")
    }
    
    let embed = new discord.MessageEmbed()
    .setImage(data)
    .setColor("RANDOM")
    .setFooter(`${message.author.username} kisses ${target.user.username} \♥`)
    .setTimestamp()
    
    message.channel.send(embed);
  }
};