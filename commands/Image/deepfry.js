const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = {
    name: 'deepfry',
    aliases: [],
    category: 'Image',
    description: 'deep fry someone',
    cooldown: 3,
    permissions: ['SEND_MESSAGES'],
run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author

    const avatar = user.displayAvatarURL({ dynamic: false, size:4096})

    fetch(`https://nekobot.xyz/api/imagegen?type=deepfry&image=${avatar}`)
    .then((res) => res.json())
    .then((data) => {
        let send = new Discord.MessageAttachment(data.message, "deepfried.png")
        message.channel.send(send)
    })
}
   
}