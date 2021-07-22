const { Client, Message, MessageEmbed } = require('discord.js');
const sendError = require('../../mores/error.js');
const db = require('quick.db')

module.exports = {
    name: 'ban',
    description: 'Ban a user from the guild',
    usage: 'ban [user] [reason]',
    category: '🔨 moderation', 
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      try {
        if(!message.guild.me.permissions.has("BAN_MEMBERS")){
            return sendError("I Don't Have Permission To Ban Members!", message.channel)
        }
        if(!message.member.permissions.has("BAN_MEMBERS")){
            return sendError("You Dont Have Permission To Ban Members!", message.channel)
        }
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let reason = args.slice(1).join(" ")

        if(!target){
            return sendError("Please Mention A User", message.channel)
        }
        if(!reason){
            return sendError("Please Enter A Reason...", message.channel)
        }
        if(target === message.guild.owner){
            return sendError("What? You Can't Ban Owner!", message.channel)
        }
        if(target === message.author){
            return sendError("I Will Ban You Sometimes", message.channel)
        }
        if (target === client.user) {
          return sendError('How dare you want to ban me', message.channel)
        }
        if(target.bannable){
            let embed = new MessageEmbed()
            .setTitle("BANNED")
            .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Banned:\n**__USER:__** ${target}
            **__REASON:__** \`${reason}\`
            **__AUTHOR__:** <@${message.author.id}>`)
            .setColor("RANDOM")
            .setFooter("BANNED_MEMBER COMMAND")

            message.channel.send(embed)
            target.ban()
        } else {
            return sendError("Please Check My Role, Or Make My Role Higher Than Everyone.", message.channel)
        }
         let channel = await client.data.fetch(`modlog_${message.guild.id}`);
      if (channel == null) return;

      if (!channel) return;
              const embed = new MessageEmbed()
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
        .setColor("#ff0000")
        .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter(message.guild.name, message.guild.iconURL())
        .addField("**Moderation**", "ban")
        .addField("**Banned**", banMember.user.username)
        .addField("**ID**", `${banMember.id}`)
        .addField("**Banned By**", message.author.username)
        .addField("**Reason**", `${reason || "**No Reason**"}`)
        .addField("**Date**", message.createdAt.toLocaleString())
        .setTimestamp();

      var sChannel = message.guild.channels.cache.get(channel);
      if (!sChannel) return;
      sChannel.send(embed);
    } catch (e) {
      return message.channel.send(`**${e.message}**`);
    }
  }
};