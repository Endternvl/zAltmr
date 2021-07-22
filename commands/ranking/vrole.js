const fs = require('fs')
const Discord = require('discord.js')

module.exports = {
    name: 'level-roles',
    aliases: ['levelroles'],
    description: 'Shows the list of Level Roles of the server.', 
    run: async (client, message, args) => {
        const Level_Roles_Storage = fs.readFileSync('./storages/Level-Roles.json')
        const Level_Roles = JSON.parse(Level_Roles_Storage.toString())
        
        const Guild_Check = Level_Roles.find(reach => {
            return reach.guildID === `${message.guild.id}`
        })
        if(!Guild_Check) {
            const noroles = new Discord.MessageEmbed()
            .setTitle('There are no Level Roles yet.')
            .setColor("#c98aff")
            .setTimestamp()
            return message.channel.send(noroles)
        }

        const List_Of_Level_Roles = Level_Roles.filter(Level_Roles => {
            return Level_Roles.guildID === message.guild.id
        }).map(Roles => {
            return Roles.Level_Role
        })
        const List_Of_Levels_To_Reach = Level_Roles.filter(Level_Roles => {
            return Level_Roles.guildID === message.guild.id
        }).map(Roles => {
            return Roles.Level_To_Reach
        })
        const List_Of_IDs = Level_Roles.filter(Level_Roles => {
            return Level_Roles.guildID === message.guild.id
        }).map(Roles => {
            return Roles.Level_Role_ID
        })

        const success = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name}`, `${message.guild.iconURL({ dynamic: true })}`)
        .setTitle('[ Level Roles ]')
        .addFields(
            {
                name: 'Name',
                value: List_Of_Level_Roles.join('\n'),
                inline: true
            },
            {
                name: 'Level To Reach',
                value: `${List_Of_Levels_To_Reach.join('\n')}`,
                inline: true
            },
            {
                name: 'ID',
                value: `${List_Of_IDs.join('\n')}`,
                inline: true
            }
        )
        .setImage('https://cdn.discordapp.com/attachments/811143476522909718/861587160126062652/Level_Roles.png')
        .setColor("#c98aff")
        .setTimestamp()
        return message.channel.send(success)
    }
}