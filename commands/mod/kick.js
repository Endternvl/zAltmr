const { Client, Message, MessageEmbed } = require('discord.js');
const sendError = require('../../mores/error.js');
const db = require('quick.db')

module.exports = {
    name: 'kick',
    aliases: ['keluarkan'],
    description: 'Kicks a member from your server',
    usage: 'kick [MEMBER] [REASON]',
    category: '🔨 moderation', 
    cooldown: 5,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(" ")

        if(!message.member.permissions.has("KICK_MEMBERS")){
            return sendError("You Don't Have Permission To Kick Members! Missing Perms - [KICK_MEMBERS]", message.channel)
        }
        if(!message.guild.me.permissions.has("KICK_MEMBERS")){
            return sendError("I Don't Have Permission To Kick Members! Missing Perms - [KICK_MEMBERS]", message.channel)
        }
        if(!target){
            return sendError("Please Enter A User!", message.channel)
        }
        if(!reason){
            return sendError("Please Enter A Reason To Kick!", message.channel)
        }
        if(target.id === message.guild.owner){
            return sendError("You Cant Kick The Owner Jerk!", message.channel)
        }
        if(target.id === message.author){
            return sendError("You Can't Kick Yourself!")
        }
        if(target.kickable){
        const embed = new MessageEmbed()
        .setTitle("Kicked Member!")
        .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`I Kicked:\n
        **__USER:__** ${target}\n
        **__REASON:__** \`${reason || "Not Provided"}\`\n
        **__AUTHOR:__** <@${message.author.id}>`)
        .setTimestamp();

        message.channel.send(embed)
        target.kick()
        } else {
            message.channel.send("Please Check My Role, Or Make My Role Is Higher Than Everyone!")
        }
        let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**ABOUT**", "kick")
                .addField("**User Kicked**", kickMember.user.username)
                .addField("**Kicked By**", message.author.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
    }
}