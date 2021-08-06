const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'deleteytchannels',
    aliases: ['delallytuser', 'deleteallytchannels'],
    description: 'Deletes all youtube channels of this Guild',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
      if(!message.member.permissions.has('MANAGE_GUILD')) {
        return message.channel.send(new MessageEmbed()
        .setTitle('Permission Error!')
        .setDescription('OOPS! Looks Like You Dont Have This Following Permission: `MANAGE_GUILD` or `ADMINISTRATOR`')
        .setColor('RED')
        )
      }

        //delete all channels method
        client.YTP.deleteAllChannels(message.guild.id)
            .then(data => {
                message.channel.send(
                    new MessageEmbed()
                        .setDescription(`I've ${data.deletedChannels.length} Channels From My Data!`)
                        .setAuthor(message.author.tag)
                        .setThumbnail(message.author.displayAvatarURL({dynamic : true}))
                        .setColor("RANDOM"));
            }).catch(e => {
                console.log(e);
                message.channel.send(`${e.message ? e.message : e}`, {
                    code: "js"
                })
            })

    }
}