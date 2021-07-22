const { MessageEmbed } = require('discord.js');
const sendError = require('../../mores/error')

module.exports = {
  name: 'nuke',
  description: 'nukes a current channel.',

  run: async(client, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS') || !message.member.hasPermission('ADMINISTRATOR')) {
            sendError(`You can\'t use this command you need \`MANAGE_CHANNELS\` permission.`, message.channel)
            return;
        }
        // check if user has Those Perms
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS') || !message.guild.me.hasPermission('ADMINISTRATOR')) {
            sendError('I need \`MANAGE_CHANNELS\` permission to run this command.', message.channel)
            return
        }
        // check if client has Those Perms

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
        // get channel
        let position = channel.position
        // get channel position
        try {
            // try
            await channel.clone().then((ch) => {
                // wait clone channel (^1)
                ch.setPosition(position)
                // set position to new channel (^1)
                channel.delete().catch(err => {
                    // delete old channel if catch err then (can't delete channel reason is required for community servers or other)
                    ch.delete()
                    // if channel is undeleteable then
                    sendError(`I can't nuke the channel due error: \`Undefined\``, message.channel)
                    return
                })

                // else ( if deleted or works)
                const embed = new MessageEmbed()
                .setTitle('💣 Boom!')
                .setDescription(`\`${ch.name}\` has been nuked by <@${message.author.id}>`)
                .setImage('https://i.pinimg.com/originals/06/c3/92/06c392b847166a9a671bfcd590d8fff7.gif')
                .setFooter('Nuked At')
                .setTimestamp()
                .setColor('YELLOW');
    
                ch.send(embed)
                })

        } catch(err) {
            sendError(`I can't nuke the channel due error: \`Undefined\``, message.channel)
        }
    }
}