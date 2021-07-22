const Discord = require("discord.js")
const db = require('quick.db')
const { default_prefix } = require('../../config.json')

module.exports = {
  name: "delword",
  description: 'delete a banned word from guild',
  
   bot: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "MANAGE_ROLES"
  ],
  permissions: ["VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "MANAGE_ROLES"],
category: 'anti-swear',run: async (client, message, args) => {
    let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;
    if (!message.channel.permissionsFor(message.author).has("MANAGE_GUILD")) return message.channel.send(":x: | **You dont have permissions to use this Command!**");
    let pog = db.get(`words_${message.guild.id}`)
    let word = args[0]
    if (!word) {
      let embed = new Discord.MessageEmbed()
      .setTitle("Error")
      .setDescription(`:x: | **No word provided**\nFormat: \`${prefix}delword fk\``)
      .setFooter(message.author.tag, message.author.displayAvatarURL())
      .setThumbnail(message.guild.iconURL())
      .setColor("#FF0000")
      return message.channel.send({
        embed: embed
      })
    }
    if (pog) {
            let data = pog.find((x) => x.word.toLowerCase() === word.toLowerCase());
            let No = new Discord.MessageEmbed()
                No.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                No.setDescription(`:x: | **Word Not Found**`)
                No.setColor("#FF0000")
                No.setFooter(message.guild.name , message.guild.iconURL());
                No.setThumbnail(message.guild.iconURL())

            if (!data) return message.channel.send({ embed: No });

            let yes = pog.indexOf(data);
            delete pog[yes];

            var filter = pog.filter((x) => {
                return x != null && x != '';
            });
            db.set(`words_${message.guild.id}`, filter);
            let embed = new Discord.MessageEmbed()
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL())
                embed.setDescription(`**The word has been deleted!** `)
                embed.setFooter(message.guild.name, message.guild.iconURL());
embed.setColor("GREEN")
embed.setTimestamp()
            return message.channel.send({ embed: embed });
        } else {
            let embed = new Discord.MessageEmbed()
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL())
                embed.setDescription(`:x: | **The word was not found!**`)
                embed.setFooter(message.guild.name, message.guild.iconURL());
                embed.setColor("#FF0000")
                embed.setTimestamp()

            return message.channel.send({ embed: embed });
            message.delete()
        }
  }
}