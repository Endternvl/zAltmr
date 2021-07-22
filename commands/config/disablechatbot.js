const Discord = require('discord.js');
const config = require('../../config.json');
const { Database } = require("quickmongo")
const db = new Database(config.mongoDBURL)

module.exports = {
        name: 'disablechatbot',
        description: 'Disables a ChatBot Channel',
        aliases: ["disablechatbotchannel", "resetchatbot"],
        usage: '<channel>',
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({embed: {
            color: "RED",
            title: `${client.emotes.error} You do not have the required Permissions! - [MANAGE_GUILD] `
        }})
    try {
        let a = db.fetch(`chatbot_${message.guild.id}`)

        if (!a) {
            return message.channel.send({embed: {
            color: 'RED',
            title:  ` ${client.emotes.error} There is no ChatBot channel set to disable! `
        }})
        } else {
            let channel = message.guild.channels.cache.get(a)
           // client.guilds.cache.get(message.guild.id).channels.cache.get(channel.ID).send(`** ${emote.verified} ChatBot Channel Disabled!**`)
            db.delete(`chatbot_${message.guild.id}`)
            db.delete(`LANG_${message.guild.id}`)
    
            message.channel.send({embed: {
            color: "BLUE",
            title: `${client.emotes.success} ChatBot Channel And Language Successfully deleted  from my **data**`
        }})
        }
        return;
    } catch(err) {
        console.log(err)
        return message.channel.send(`${client.emotes.error} Error - Missing Permissions or Channel Doesn't Exist`)
    }

    }
};