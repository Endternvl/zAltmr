const { Client, Message, MessageEmbed } = require("discord.js")

module.exports = {
    name: 'sudo',
    category: 'fun',
    cooldown: 3,
    description: 'Make anyone say anything!',
    botpermission: ['MANAGE_WEBHOOKS'],
    run: async (client, message, args) => {
        if (!args[0]) return message.reply('Please mention someone!')
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) return message.reply(`Couldn't find this user! please enter a valid user else it's not gonna works.`)

        message.channel.createWebhook(member.user.username, {
            avatar: member.user.displayAvatarURL({ dynamic: true })
        }).then(webhook => {
            webhook.send(args.slice(1).join(' '))
            setTimeout(() => {
                webhook.delete()
            }, 3000)
        })
    }
}