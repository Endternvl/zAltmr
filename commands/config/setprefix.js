const db = require("quick.db")
const { default_prefix } = require("../../config.json")
const sendError = require('../../mores/error')
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "setprefix",
  category: "moderation",
  aliases: ['prefix', 'changeprefix', 'newprefix'],
  usage: "prefix [NEW_PREFIX]",
  description: "Change the guild prefix",
  run: async (client, message, args) => {
    //PERMISSION
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return sendError("**You are not allowed or do not have permission to change prefix, missing perms: `ADMINISTRATOR`**", message.channel)
    }
    
    if(!args[0]) {
      return sendError("**Please give the prefix that you want to set**", message.channel)
    } 
    
    if(args[1]) {
      return sendError("**You can not set prefix a double argument**", message.channel)
    }
    
    if(args[0].length > 3) {
      return sendError("**You Cannot Set A Prefix More Than 3 Arguments!**", message.channel)
    }
    
    if(args.join("") === default_prefix) {
      let reseted = new MessageEmbed()
      .setTitle("Success!")
      .setDescription(`Prefix was resseted! | Back To \`${default_prefix}\``)
      .setColor("GREEN")
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setFooter(`Requested By ${message.author.username}`);
      db.delete(`prefix_${message.guild.id}`)
     return await message.channel.send(reseted)
    }
    
    db.set(`prefix_${message.guild.id}`, args[0])
    let doneembed = new MessageEmbed()
    .setTitle("Success!")
    .setDescription(`Setted Server Bot Prefix to \`${args[0]}\``)
    .setColor("GREEN")
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setFooter(`Requested By ${message.author.username}`)
  await message.channel.send(doneembed)
  const channel  = db.fetch(`modlog_${message.guild.id}`);
                if (!channel) return;
            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**ACTION**", "changed prefix")
                .addField("**Before Prefix**", `${default_prefix}`)
                .addField("**Changed Prefix To**", args[0])
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();
  
            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
    
  }
}