const client = require('../index')
const { MessageEmbed } = require('discord.js')
const schema = require('../models/ghostping')

client.on('messageDelete', async(message) => {
schema.findOne({ Guild: message.guild.id }, async(err, data) => {
        if(!data) return;
        const member = message.mentions.members.first()
        if(member) {
            if(member.id == message.author.id) return;
            if(message.author.bot) return;
          message.channel.send(new MessageEmbed()
            .setTitle(`\🚨 Ghost Ping Detected \🚨`)
            .addField(`\🥺 Author`, message.author.tag, true)
            .addField(`\📱 Content`, message.content, true)
            .setColor("RANDOM")
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          )
        }
      })
})