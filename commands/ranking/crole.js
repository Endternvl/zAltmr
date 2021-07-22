const fs = require('fs')
const Discord = require('discord.js')

module.exports = {
    name: 'edit-level-role',
    aliases: ['editlevelrole', 'edlr'],
    description: 'Edit a Level Role that is given when a user levels up.', 
    run: async (client, message, args) => {
        const permission = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true })}`)
        .setTitle(':x: You dont have any permissions to use this command. :x:')
        .setColor("#c98aff")
        .setTimestamp()
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(permission)

        const provideID = new Discord.MessageEmbed()
        .setTitle('You need to provide a role ID.')
        .setColor('#c98aff')
        .setTimestamp()
        const provide = new Discord.MessageEmbed()
        .setTitle('You need to provide a number.')
        .setDescription('This will change the Level Number.')
        .setColor('#c98aff')
        .setTimestamp()

        const Role_To_Edit = args[0]
        if(!Role_To_Edit) return message.channel.send(provideID)

        const New_Number = args[1]
        if(!New_Number) return message.channel.send(provide)
        if(isNaN(New_Number)) return message.channel.send(provide)

        if(New_Number.includes('+')) return message.channel.send(provide)
        if(New_Number.includes('-')) return message.channel.send(provide)
        if(New_Number.includes('.')) return message.channel.send(provide)

        const Level_Roles_Storage = fs.readFileSync('./storages/Level-Roles.json')
        const Level_Roles = JSON.parse(Level_Roles_Storage.toString())
        
        const Level_Role_ID_Check = Level_Roles.find(id => {
            return (id.guildID === `${message.guild.id}` && id.Level_Role_ID === Role_To_Edit)
        })
        if(!Level_Role_ID_Check) {
            const no_Roles = new Discord.MessageEmbed()
            .setTitle('There is no Level Role with that ID.')
            .setColor("#c98aff")
            .setTimestamp()
            return message.channel.send(no_Roles)
        } else {
            const New_Level_Number = Level_Role_ID_Check.Level_To_Reach = parseInt(New_Number)
            
            const Updating_Data = JSON.stringify(New_Level_Number, null, 4)
            fs.writeFileSync('./storages/Level-Roles.json', Updating_Data)
    
            const Updated_Data = JSON.stringify(Level_Roles, null, 4)
            fs.writeFileSync('./storages/Level-Roles.json', Updated_Data)

            const success = new Discord.MessageEmbed()
            .setTitle('Level Role has been successfully edited.')
            .setColor("#c98aff")
            .setTimestamp()
            return message.channel.send(success)
        }
    }
}