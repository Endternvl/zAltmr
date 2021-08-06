const db = require('quick.db')
const discord = require('discord.js')
const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'setantialt',
    description: 'Set Anti-Alt To This Guild',
    aliases: ['setanti', 'antialt'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return;
        let option = args[0]
        if(!option) {
            const embed = new discord.MessageEmbed()
            .setAuthor("Anti-Alt")
            .setDescription(`There are two options for this anti-alt command. \`${client.prefix}setantialt enable\` to enable the **AntiAlt** system.\n\`${client.prefix}setantialt disable\` to disable the **AntiAlt** system`)
            .setColor('RED')
            .setFooter('zAltmr Anti Alt System');
            return message.channel.send(embed)
        }

        let logsChannel = message.mentions.channels.first()
        let database = db.get(`antialt.${message.guild.id}`)

        if(option.toLowerCase() === 'enable') {
            if(database) {
                return message.channel.send("Anti-Alt System Is Altrady Enabled In This Guild.")
            }
            let days = args[2]
            if(!logsChannel) {
                return message.channel.send("You need to mention a channel for the anti-alt logs channel")
            }
            if(!days) {
                return message.channel.send("Please tell me the minimum age/days requirement of the account!")
            }
            if(isNaN(days)) {
                return message.channel.send("Days must be a number!")
            }

            db.set(`antialt.${message.guild.id}`, logsChannel)
            db.set(`altdays.${message.guild.id}`, days)
            const embed = new MessageEmbed()
            .setAuthor("Anti-Alt")
            .setColor('GREEN')
            .setDescription(`${message.author.tag} has just enabled the **Anti-Alt** system!`)
            .setFooter('zAltmr Anti Alt System');
            return message.channel.send(embed)
        } else if(option.toLowerCase() === 'disable') {
            if(!database) {
                return message.channel.send("This server has no enabled anti-alt system");
            }

            db.delete(`antialt.${message.guild.id}`)
            db.delete(`altdays.${message.guild.id}`)
            
            const embed = new MessageEmbed()
            .setAuthor("Anti-Alt")
            .setColor('RANDOM')
            .setDescription(`${message.author.tag} has just disabled **Anti-Alt** system.`)
            .setFooter('zAltmr Anti Alt System');
            return message.channel.send(embed)
           
        }
    },
};